import { Injectable  } from "@angular/core";
import { Http, Headers } from "@angular/http";
import {Task } from "../models/Task";
import 'rxjs/add/operator/map';

@Injectable()
export class TaskService{

    constructor(private http:Http){

        console.log("svc ok");

    }

    getTasks(){
        return this.http.get('/api/tasks')
            .map(res => res.json());
    }

    addTask(task:Task){
        console.log(task);
        const h = new Headers();
        h.append("Content-Type", "application/json");

        return this.http.post('/api/task', JSON.stringify(task), {headers: h})
        .map(res => res.json());
    }

    delete(id: string){



        return this.http.delete('/api/task/' + id).map( r => r.json());
    }
}