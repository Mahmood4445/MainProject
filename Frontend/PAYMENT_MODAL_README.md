# Frontend Payment Modal Implementation

This implementation creates a payment modal popup that appears when users click the "Payment" button in the header.

## Features

✅ **Modal Popup**: Centered on screen with backdrop overlay  
✅ **Form Fields**: Name, Email, Amount, Currency (SGD/MYR)  
✅ **Modern UI**: Uses shadcn/ui components with Tailwind CSS  
✅ **Responsive Design**: Works on mobile and desktop  
✅ **Form Validation**: Client-side validation with required fields  
✅ **Accessibility**: Keyboard navigation (Escape key) and proper focus management  
✅ **Smooth Animations**: Slide-in animation and backdrop blur  

## Components Created

### 1. PaymentModal Component (`src/components/PaymentModal.tsx`)

A reusable modal component with:
- **Form fields**: Name, Email, Amount, Currency dropdown
- **Validation**: Required fields and email format validation
- **Close options**: X button, Cancel button, backdrop click, Escape key
- **Loading state**: Shows "Processing..." during form submission
- **Success handling**: Resets form and shows success message

### 2. Updated Header Component (`src/components/Header.tsx`)

Modified the existing payment button to:
- Open the payment modal instead of external URL
- Manage modal state with `useState`
- Integrate with the PaymentModal component

## How to Use

1. **Click the Payment Button**: Located in the top-right corner of the header
2. **Fill the Form**: Enter your details in the modal
3. **Submit**: Click "Process Payment" to submit the form
4. **Close**: Use any of the close options to dismiss the modal

## Form Fields

- **Full Name**: Text input (required)
- **Email Address**: Email input with format validation (required)
- **Amount**: Number input with decimal support (required)
- **Currency**: Dropdown with SGD and MYR options

## Modal Features

- **Centered Positioning**: Modal appears in the center of the screen
- **Backdrop**: Semi-transparent overlay with blur effect
- **Responsive**: Adapts to different screen sizes
- **Animations**: Smooth slide-in animation
- **Focus Management**: Proper focus handling for accessibility

## Integration with Backend

The modal is currently set up for frontend-only operation with simulated API calls. To integrate with your Django backend:

1. **Update the handleSubmit function** in `PaymentModal.tsx`:
   ```typescript
   const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();
     setIsSubmitting(true);

     try {
       const response = await fetch('/api/payment/', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify(formData),
       });

       if (response.ok) {
         // Handle success
         onClose();
         // Show success message
       } else {
         // Handle error
         throw new Error('Payment failed');
       }
     } catch (error) {
       console.error('Payment error:', error);
       // Show error message
     } finally {
       setIsSubmitting(false);
     }
   };
   ```

2. **Add CSRF token handling** if needed for Django:
   ```typescript
   headers: {
     'Content-Type': 'application/json',
     'X-CSRFToken': getCookie('csrftoken'), // Add CSRF token
   },
   ```

## Styling

The modal uses:
- **shadcn/ui components**: Button, Input, Label, Select
- **Tailwind CSS**: For responsive design and animations
- **Lucide React icons**: For the close button
- **Custom animations**: Slide-in effect and backdrop blur

## Accessibility Features

- **Keyboard navigation**: Escape key to close modal
- **Focus management**: Proper focus trapping within modal
- **Screen reader support**: Proper ARIA labels and semantic HTML
- **Color contrast**: Meets accessibility standards

## Future Enhancements

- **Toast notifications**: Replace alert() with proper toast system
- **Form validation**: Add more sophisticated validation rules
- **Payment gateway integration**: Connect to Stripe, PayPal, etc.
- **Receipt generation**: Generate and display payment receipts
- **Payment history**: Track and display payment history
- **Multi-step form**: Add additional payment steps if needed

## Testing

To test the payment modal:

1. Start the development server:
   ```bash
   cd Frontend
   npm run dev
   ```

2. Navigate to your application
3. Click the "Payment" button in the header
4. Test form validation by submitting empty forms
5. Test close functionality with different methods
6. Test responsive behavior on different screen sizes
