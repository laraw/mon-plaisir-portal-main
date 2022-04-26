import { Component, OnInit } from '@angular/core';
import { Feedback } from 'src/app/api/models/feedback';
import { FeedbackService } from 'src/app/api/services/feedback.service';
import { Utils } from 'src/app/shared/utils';


@Component({
  selector: 'app-list-feedback',
  templateUrl: './list-feedback.component.html',
  styleUrls: ['./list-feedback.component.css']
})
export class ListFeedbackComponent implements OnInit {

  feedback: Feedback[];
  feedbackFiltered: Feedback[];
  totalPages: number;
  currentPage: number = 1;
  lastPage: number;
  recordsPerPage: number = 10;
  showFeedback: boolean = true;

  constructor(private utils: Utils, private feedbackService: FeedbackService) { }

  ngOnInit(): void {
    this.feedbackService.getFeedback().subscribe(requests => {
      //console.log(tasks);
      this.feedback = requests;
      this.feedbackFiltered = this.utils.paginate(this.feedback, this.recordsPerPage, this.currentPage); 
      this.totalPages = this.utils.calculatePagesCount(this.recordsPerPage, this.feedback.length);
      this.showFeedback = requests.length > 0;

    });

  }

  
  next() {
    this.currentPage++;

    this.feedbackFiltered = this.utils.paginate(this.feedback, this.recordsPerPage, this.currentPage);

  }

  selectPage(pageNumber: number) {
  
    this.currentPage = pageNumber;
    this.feedbackFiltered = this.utils.paginate(this.feedback, this.recordsPerPage, pageNumber);
    
  }
  previous() {

    this.currentPage--;
    this.feedbackFiltered = this.utils.paginate(this.feedback, this.recordsPerPage, this.currentPage);

  }

  counter(i: number) {
    return new Array(i);
  }

}
