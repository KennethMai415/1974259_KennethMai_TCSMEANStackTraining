import { newArray } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Question } from '../question.model';
import { QuestionsHandlingService } from '../questions-handling.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})

export class QuestionsComponent implements OnInit {
  questions:Array<Question> = [];
  answersSelected:Array<string> = new Array(10).fill("No Answer Selected");
  numCorrect:number = 0;

  constructor(public service:QuestionsHandlingService) { }

  ngOnInit(): void {
    this.service.loadQuestions().subscribe(result=>this.questions=result);
  }

  inputAnswer(questionId:number, selectedAnswer:string):void {
    this.answersSelected[questionId] = selectedAnswer;
  }

  submitAnswers():void {
    let isCorrect:string = "";
    this.numCorrect=0;

    for(let i in this.questions) {
      if(this.answersSelected[i] == this.questions[i].CorrectAnswer) {
        this.numCorrect++;
        isCorrect = "Correct";
      } else {
        isCorrect = "Wrong";
      }

      let modalResultsBody: HTMLElement | null = document.getElementById("questionAnsInfo");
      let htmlAnsStr = document.createElement('div');
      htmlAnsStr.innerHTML = this.questions[i].Question + '<br/>' + isCorrect + '<br/>Your Answer: ' + this.answersSelected[i] + `<br/>Correct Answer: ` + this.questions[i].CorrectAnswer + `<br/><hr/>`;

      if(modalResultsBody != null) {
        modalResultsBody.appendChild(htmlAnsStr);
      }
    }
  }

  ResetResults() :void {
    let resultsModal = document.querySelector('#questionAnsInfo');
    if(resultsModal != null) {
      resultsModal.textContent = '';
    }
  }
}
