import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { GrowlService } from 'src/app/shared/growl.service';

interface Picture {
  id: string;
  name: string;
  url: string;
}

@Component({
  selector: 'app-multi-style-transfer',
  templateUrl: './multi-style-transfer.component.html',
  styleUrls: ['./multi-style-transfer.component.less']
})
export class MultiStyleTransferComponent {
  constructor(private sharedService: SharedService, private router: Router, private growlService: GrowlService) { }

  pictures: Picture[] = [];
  selectedPictures: Picture[] = [];
  uploadedFile: File | null = null;
  uploadedID: string = '';
  isUploaded: boolean = false;
  styledImage: string = '';
  isLoading: boolean = false; // Loader for generateImage
  isFetchingImages: boolean = false; // Loader for getImages

  ngOnInit(): void {
    this.fetchImages();
  }

  fetchImages(): void {
    this.isFetchingImages = true; // Show loader
    this.sharedService.getMultiImages().subscribe(
      (response) => {
        if (Array.isArray(response)) {
          this.pictures = response;
        } else {
          console.error('Expected an array, received:', response);
          // Fallback to an empty array if the response isn't an array
          this.pictures = [];
        }
      },
      (error) => {
        console.error('Error fetching images:', error);
        this.growlService.showGrowl('error', 'Failed to fetch images. Please try again later.');
      }
    ).add(() => this.isFetchingImages = false); // Hide loader when request completes
  }       

  isSelected(picture: Picture): boolean {
    return this.selectedPictures.includes(picture);
  }

  toggleSelected(picture: Picture): void {
    const index = this.selectedPictures.indexOf(picture);
    if (index !== -1) {
      this.selectedPictures.splice(index, 1); // Remove picture if already selected
    } else {
      if (this.selectedPictures.length < 2) {
        this.selectedPictures.push(picture); // Add picture if less than two already selected
      } else {
        // Optionally, you can show a growl message to the user indicating that only two images can be selected.
        this.growlService.showGrowl('warning', 'Only two images can be selected.');
      }
    }
  }

  onFileSelected(event: any): void {
    const fileList: FileList = event.target.files;
    if (fileList && fileList.length > 0) {
      this.uploadedFile = fileList[0];
    } else {
      console.error('No file selected.');
      // Optionally, you can show a growl message to the user indicating that no file was selected.
      this.growlService.showGrowl('error','No file selected. Please select a file to upload.');
    }
  }

  uploadPicture(): void {
    if (!this.uploadedFile) {
      console.error('No picture selected.');
      // Optionally, you can show a growl message to the user indicating that no picture was selected.
      this.growlService.showGrowl('error','No picture selected. Please select a picture to upload.');
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      const fileContent = fileReader.result as string;
      const payload = {
        image: {
          name: this.uploadedFile?.name || '', // Use optional chaining and provide a fallback value
          type: this.uploadedFile?.type || '', // Use optional chaining and provide a fallback value
          size: this.uploadedFile?.size || 0, // Use optional chaining and provide a fallback value
          content: fileContent // Sending file content along with other metadata
        },
        userID: localStorage.getItem('userId')
        };
      this.sharedService.uploadMultiImage(payload).subscribe(
        (response: any) => {
          // Optionally, you can show a growl message to the user indicating successful upload.
          this.uploadedID = response;
          this.isUploaded = true
          this.growlService.showGrowl('success','Picture uploaded successfully.');
        },
        (error: any) => {
          console.error('Error uploading picture:', error);
          // Optionally, you can show a growl message to the user indicating the error.
          this.growlService.showGrowl('error','Failed to upload picture. Please try again later.');
        }
      );
    };

    fileReader.readAsDataURL(this.uploadedFile);
  }

  generateImage() {
    if(this.isUploaded && this.selectedPictures.length === 2) {
      const payload = {
        selectedImages: this.selectedPictures,
        uploadedID: this.uploadedID,
        userID: localStorage.getItem('userId') || '' // Ensure userId is a string and provide a fallback value
      };

      console.log("Payload: ", payload);
      this.isLoading = true; // Show loader
      this.styledImage = '';
      this.sharedService.generateMultiImage(payload).subscribe(
        (response: any) => {
          this.styledImage = `data:image/jpeg;base64,${response.image}`;
          // this.isUploaded = false;
          this.growlService.showGrowl('success', 'Image Generated successfully.');
        },
        (error: any) => {
          console.error('Error uploading picture:', error);
          this.growlService.showGrowl('error', 'Failed to generate image. Please try again later.');
        }
      ).add(() => this.isLoading = false); // Hide loader when request completes
    } else {
      this.growlService.showGrowl('warning', 'Selected Images Missing or Image not Uploaded!!!');
    }   

  }

  resetFilter() {
    this.selectedPictures = [];
    this.uploadedFile = null;
    this.uploadedID = '';
    this.isUploaded = false;
  }
}
