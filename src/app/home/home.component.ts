import { Component, OnInit, ViewChild } from '@angular/core';
import { first } from 'rxjs/operators';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import { EventService } from './event.service';
import _ from 'lodash';

import * as moment from 'moment';

import { User } from '@/_models';
import { UserService, AuthenticationService } from '@/_services';

export interface IEvent {
  id?: number;
  title?: string;
  description?: string;
  start?: Date;
  end?: Date;
  type?: string;
  color?: string;
  textColor?: string;
  className?: string;
  borderColor?: string;
}

function createEvent(config: IEvent): { title: string; start: Date, color: string, id: number, end: Date } {
  let newEvent = { title: "event", start: new Date(Date.now()), color: "green", id: 1, end:  new Date(Date.now())};
  if (config.title) {
    newEvent.title = config.title;
  }
  if (config.start) {
    newEvent.start = config.start;
  }
  if (config.color) {
    newEvent.color = config.color;
  }
  if (config.end) {
    newEvent.end = config.end;
  }
  return newEvent;
}

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
  showModal: boolean;
  id: number;
  name: string;
  dateStart: Date;
  dateEnd: string;
  currentUser: User;
  userFromApi: User;
  calendarOptions: Options;
  displayEvent: any;
  showScheduleModal: boolean = false;
  dayClickDate: any = 'test';

  @ViewChild(CalendarComponent) myCalendar: CalendarComponent;

  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit() {
    this.userService.getById(this.currentUser.id).pipe(first()).subscribe(user => {
      this.userFromApi = user;
    });
    this.calendarOptions = {
      defaultDate: new Date(),
      editable: true,
      eventLimit: true,
      selectable: true,
      selectHelper: true,
      header: {
        left: 'prev,next addEvent',
        center: 'title',
        right: 'month,listMonth'
      },
      dayClick: (date, jsEvent, view) => this.dayClick(date, jsEvent, view),
      select: function(start, end) { alert(start); alert(end); },
      events: [
        {
          id: 7999,
          title: 'All Day Event',
          start: '2018-12-01',
          color: '#ffff00'
        },
        {
          id:876,
          title: 'Long Event',
          start: '2018-12-07',
          end: '2018-12-10'
        },
        {
          id: 999,
          title: 'Repeating Event',
          start: '2018-12-12T16:00:00'
        },
        {
          id: 999,
          title: 'Repeating Event',
          start: '2018-12-16T16:00:00'
        },
        {
          id: 258,
          title: 'Conference',
          start: '2018-12-11',
          end: '2018-12-13'
        },
        {
          id: 9399,
          title: 'Click for Google',
          url: 'http://google.com/',
          start: '2018-12-28'
        }
      ]
    };
  }
  clickButton(model: any) {
    this.displayEvent = model;
  }
  eventClick(model: any) {
    this.id = model.event.id;
    this.name = model.event.title;
    this.dateStart = model.event.start;
    this.dateEnd = model.event.end;
    this.showModal = true;
  }
  dayClick(date, jsEvent, view) {
    //
  }
  updateEvent(model: any) {
    var dateStr = prompt('Insira a nova data no formato YYYY-MM-DD (Ex: 2019-01-01)');
    var date = moment(dateStr).toDate();
    if (date) {
      var titleStr = prompt('Insira o nome do evento');

      this.name = titleStr;
      this.dateStart = date;

      this.myCalendar.fullCalendar('updateEvent', this);
     this.showModal = false;
    } else {
      alert('Data Invalida, tente novamente.');
    }
  }
  deleteEvent(model: any) {
    if (confirm("Certeza que deseja deletar o evento: " + this.name)) {
      this.myCalendar.fullCalendar('removeEvents', this.id);
      this.showModal = false;
      alert("Evento deletado com sucesso!");
    }

  }
  hide(model: any) {
    this.showModal = false;
  }
  addNewEvent(model: any) {
    var dateStr = prompt('Insira a data no formato YYYY-MM-DD (Ex: 2019-01-01)');
    var date = moment(dateStr).toDate();
    if (date) {
      var titleStr = prompt('Insira o nome do evento');
      let myEvent = createEvent({ id: 1, title: titleStr, start: date, color: 'green', end:date });
      this.myCalendar.fullCalendar('renderEvent', myEvent);
      this.myCalendar.fullCalendar('rerenderEvents');
      alert('Evento adicionado com sucesso!');
    } else {
      alert('Data Invalida, tente novamente.');
    }
  }
}//fim
