import { useEffect, useState, useRef, useCallback } from 'react';

// Interface for the Review data from API
interface Review {
  id: number;
  author_name: string;
  rating: number;
  text: string;
  created_at: string;
}

const Reviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // State for API data
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State for expanded reviews
  const [expandedReviews, setExpandedReviews] = useState<Set<number>>(new Set());

  // Function to toggle review expansion
  const toggleReviewExpansion = (reviewId: number) => {
    setExpandedReviews(prev => {
      const newSet = new Set(prev);
      if (newSet.has(reviewId)) {
        newSet.delete(reviewId);
      } else {
        newSet.add(reviewId);
      }
      return newSet;
    });
  };

  // Function to truncate text
  const truncateText = (text: string, maxLength: number = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  };

  // Fetch reviews from Django API
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await fetch('http://localhost:8000/api/reviews/');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Handle pagination if Django returns paginated results
        const reviewsData = data.results || data;
        setReviews(reviewsData);
        
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch reviews');
        
        // Fallback to hardcoded reviews if API fails
        setReviews([
          {
            id: 1,
            author_name: "Sarah Johnson",
            rating: 5,
            text: "GoEasyTrip has revolutionized our corporate travel management. The seamless integration and 24/7 support have made booking business trips incredibly efficient.",
            created_at: new Date().toISOString()
          },
          {
            id: 2,
            author_name: "Michael Chen",
            rating: 5,
            text: "Outstanding B2B solutions! The technology platform is robust and the pricing is highly competitive. Our partnership has been incredibly successful.",
            created_at: new Date().toISOString()
          },
          {
            id: 3,
            author_name: "Emily Rodriguez",
            rating: 5,
            text: "The best travel technology partner we've worked with. Their API integration is flawless and the customer service is exceptional.",
            created_at: new Date().toISOString()
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, []);

  // Auto-scroll functionality with infinite forward-only loop
  useEffect(() => {
    if (!isAutoPlaying || isDragging) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        // Create seamless infinite forward scrolling
        if (nextIndex >= reviews.length * 2) {
          // When we reach the end of the second set, instantly jump to the first set
          // This creates the illusion of infinite forward scrolling
          return 0;
        }
        return nextIndex;
      });
    }, 4000); // Change review every 4 seconds for smoother experience

    return () => clearInterval(interval);
  }, [isAutoPlaying, isDragging, reviews.length]);

  // Touch/Mouse event handlers for smooth forward-only scrolling
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    setIsAutoPlaying(false);
    setStartX(e.pageX - (containerRef.current?.offsetLeft || 0));
    setScrollLeft(currentIndex);
  }, [currentIndex]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    
    const x = e.pageX - (containerRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    // Ensure forward-only scrolling by limiting to forward direction
    const newIndex = Math.max(currentIndex, Math.min(reviews.length * 2 - 1, Math.round(scrollLeft - walk / 300)));
    
    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
    }
  }, [isDragging, startX, scrollLeft, currentIndex, reviews.length]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    // Resume auto-play after a delay
    setTimeout(() => setIsAutoPlaying(true), 2000);
  }, []);

  // Touch event handlers for forward-only scrolling
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setIsDragging(true);
    setIsAutoPlaying(false);
    setStartX(e.touches[0].pageX - (containerRef.current?.offsetLeft || 0));
    setScrollLeft(currentIndex);
  }, [currentIndex]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging) return;
    
    const x = e.touches[0].pageX - (containerRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    // Ensure forward-only scrolling by limiting to forward direction
    const newIndex = Math.max(currentIndex, Math.min(reviews.length * 2 - 1, Math.round(scrollLeft - walk / 300)));
    
    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
    }
  }, [isDragging, startX, scrollLeft, currentIndex, reviews.length]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
    // Resume auto-play after a delay
    setTimeout(() => setIsAutoPlaying(true), 2000);
  }, []);

  // Manual navigation
  const goToReview = useCallback((index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    // Resume auto-play after a delay
    setTimeout(() => setIsAutoPlaying(true), 3000);
  }, []);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-lg ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}>
        ★
      </span>
    ));
  };

  return (
    <section id="reviews" className="py-16 bg-blue-900">
      <div className="px-4 sm:px-6 lg:px-8 xl:px-12 max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-5xl sm:text-6xl font-bold text-white mb-6">
            What Our Clients Say
          </h2>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="text-white text-xl">Loading reviews...</div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <div className="text-white text-xl">Error: {error}</div>
            <div className="text-blue-200 text-sm mt-2">Showing fallback reviews</div>
          </div>
        )}

        {/* Reviews Container with Side Peek */}
        {!isLoading && !error && reviews.length > 0 && (
        <div className="relative max-w-7xl mx-auto">
          {/* Smooth Scrolling Reviews Container */}
          <div 
            ref={containerRef}
            className="overflow-hidden cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Infinite Scrolling Reviews */}
            <div 
              className="flex transition-transform duration-1000 ease-in-out" 
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {/* First set of reviews for seamless loop */}
              {reviews.map((review, index) => (
                <div 
                  key={`first-${review.id}`}
                  className="flex-shrink-0 w-full px-8 lg:px-12"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8 text-center max-w-4xl mx-auto min-h-[300px] flex flex-col justify-between">
                    {/* Rating Stars */}
                    <div className="flex justify-center mb-4">
                      {renderStars(review.rating)}
                    </div>
                    
                    {/* Review Text */}
                    <div className="flex-grow">
                      <blockquote className="text-lg lg:text-xl text-gray-700 leading-relaxed italic mb-3">
                        "{expandedReviews.has(review.id) ? review.text : truncateText(review.text)}"
                      </blockquote>
                      {review.text.length > 150 && (
                        <button
                          onClick={() => toggleReviewExpansion(review.id)}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors duration-200"
                        >
                          {expandedReviews.has(review.id) ? 'Show Less' : 'Show More'}
                        </button>
                      )}
                    </div>
                    
                    {/* Reviewer Info */}
                    <div className="flex items-center justify-center space-x-3">
                      <div className="text-left">
                        <h4 className="font-bold text-blue-950 text-base">{review.author_name}</h4>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Duplicate set for seamless infinite loop */}
              {reviews.map((review, index) => (
                <div 
                  key={`second-${review.id}`}
                  className="flex-shrink-0 w-full px-8 lg:px-12"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8 text-center max-w-4xl mx-auto min-h-[300px] flex flex-col justify-between">
                    {/* Rating Stars */}
                    <div className="flex justify-center mb-4">
                      {renderStars(review.rating)}
                    </div>
                    
                    {/* Review Text */}
                    <div className="flex-grow">
                      <blockquote className="text-lg lg:text-xl text-gray-700 leading-relaxed italic mb-3">
                        "{expandedReviews.has(review.id) ? review.text : truncateText(review.text)}"
                      </blockquote>
                      {review.text.length > 150 && (
                        <button
                          onClick={() => toggleReviewExpansion(review.id)}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors duration-200"
                        >
                          {expandedReviews.has(review.id) ? 'Show Less' : 'Show More'}
                        </button>
                      )}
                    </div>
                    
                    {/* Reviewer Info */}
                    <div className="flex items-center justify-center space-x-3">
                      <div className="text-left">
                        <h4 className="font-bold text-blue-950 text-base">{review.author_name}</h4>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows - Positioned on sides */}
          {/* Previous Arrow - Left Side */}
          <button
            onClick={() => {
              const newIndex = currentIndex > 0 ? currentIndex - 1 : reviews.length * 2 - 1;
              setCurrentIndex(newIndex);
              setIsAutoPlaying(false);
              setTimeout(() => setIsAutoPlaying(true), 3000);
            }}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-blue-600 hover:text-blue-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-10"
            aria-label="Previous review"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Next Arrow - Right Side */}
          <button
            onClick={() => {
              const newIndex = (currentIndex + 1) % (reviews.length * 2);
              setCurrentIndex(newIndex);
              setIsAutoPlaying(false);
              setTimeout(() => setIsAutoPlaying(true), 3000);
            }}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-blue-600 hover:text-blue-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-10"
            aria-label="Next review"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        )}
      </div>
    </section>
  );
};

export default Reviews;
