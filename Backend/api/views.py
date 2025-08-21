import os
from django.conf import settings
from django.http import FileResponse, Http404
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Review
from .serializers import ReviewSerializer

# Reviews CRUD
class ReviewListCreateView(generics.ListCreateAPIView):
    queryset = Review.objects.all().order_by("-created_at")
    serializer_class = ReviewSerializer

class ReviewDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

# PDF endpoints
class PDFMetaView(APIView):
    def get(self, request):
        rel_path = "docs/my_file.pdf"  # relative path to your single PDF
        abs_path = os.path.join(settings.MEDIA_ROOT, rel_path)
        if not os.path.exists(abs_path):
            raise Http404("PDF not found")
        url = request.build_absolute_uri(settings.MEDIA_URL + rel_path)
        return Response({
            "title": os.path.basename(rel_path),
            "size_bytes": os.path.getsize(abs_path),
            "url": url,
        })

class PDFDownloadView(APIView):
    def get(self, request):
        rel_path = "docs/my_file.pdf"
        abs_path = os.path.join(settings.MEDIA_ROOT, rel_path)
        if not os.path.exists(abs_path):
            raise Http404("PDF not found")
        return FileResponse(open(abs_path, "rb"), as_attachment=True, filename="my_file.pdf")
