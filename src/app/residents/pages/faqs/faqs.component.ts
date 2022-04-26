import { Component, OnInit } from '@angular/core';
import { Faq } from 'src/app/api/models/faq';
import { FaqService } from 'src/app/api/services/faq.service';


@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.css']
})
export class FaqsComponent implements OnInit {


  public isCollapsed = false;
  public faqs: Faq[];
  public hasFaq: boolean;


  constructor(private faqService: FaqService) { this.hasFaq = false; }

  ngOnInit(): void {

    this.faqService.getPublishedFaqs().subscribe(faqs => {
      //console.log(tasks);
      this.faqs = faqs;
      if (this.faqs.length > 0) {
       
      this.hasFaq = true; 
      }
    });

  }

}
