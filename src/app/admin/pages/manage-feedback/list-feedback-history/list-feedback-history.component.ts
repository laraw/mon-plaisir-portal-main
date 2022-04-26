import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Feedback, Comment } from 'src/app/api/models/feedback';

@Component({
  selector: 'app-list-feedback-history',
  templateUrl: './list-feedback-history.component.html',
  styleUrls: ['./list-feedback-history.component.css']
})
export class ListFeedbackHistoryComponent implements OnInit {

  @Input() feedback: Feedback;
  comments: Comment[];
  
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    this.comments = this.feedback.comments;
  }

  openLg(content) {
    this.modalService.open(content, { size: "lg" });
  }

}
