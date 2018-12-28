import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/observable/of';
@Injectable()
export class EventService {
    public getEvents(): Observable<any> {
        const dateObj = new Date();
        const yearMonth = dateObj.getUTCFullYear() + '-' + (dateObj.getUTCMonth() + 1);
        let data: any = [{
            title: 'All Day Event',
            start: yearMonth + '-01',
            DoctorsCount: 5,
            TotalAppointments: 20,
            Booked: 10,
            Cancelled: 2
        },
        {
            title: 'All Day Event',
            start: yearMonth + '-02',
            DoctorsCount: 8,
            TotalAppointments: 20,
            Booked: 10,
            Cancelled: 2
        },
        {
            title: 'All Day Event',
            start: yearMonth + '-03',
            DoctorsCount: 40,
            TotalAppointments: 20,
            Booked: 10,
            Cancelled: 2
        },
        {
            title: 'All Day Event',
            start: yearMonth + '-05',
            DoctorsCount: 40,
            TotalAppointments: 20,
            Booked: 10,
            Cancelled: 2
        }
        ];
        return Observable.of(data);
    }
};
