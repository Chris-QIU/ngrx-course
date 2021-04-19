import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Course } from "../model/course";
import { map } from "rxjs/operators";
import { Lesson } from "../model/lesson";

@Injectable()
export class CoursesHttpService {
  constructor(private http: HttpClient) {}

  /*
   * observations:
   *    all of these methods trigger a new http request,
   *    return the request as observables
   *    and consume them inside a component
   *
   *    so the data are purely from the backend
   *    this is so called 'stateless' app
   */

  // get all courses
  findAllCourses(): Observable<Course[]> {
    return this.http.get("/api/courses").pipe(map((res) => res["payload"]));
  }

  // get a single course
  findCourseByUrl(courseUrl: string): Observable<Course> {
    return this.http.get<Course>(`/api/courses/${courseUrl}`);
  }

  // find lessons by course id
  findLessons(
    courseId: number,
    pageNumber = 0,
    pageSize = 3
  ): Observable<Lesson[]> {
    return this.http.get<Lesson[]>("/api/lessons", {
      params: new HttpParams()
        .set("courseId", courseId.toString())
        .set("sortOrder", "asc")
        .set("pageNumber", pageNumber.toString())
        .set("pageSize", pageSize.toString()),
    });
  }

  // save course changes by id
  saveCourse(courseId: number | string, changes: Partial<Course>) {
    return this.http.put("/api/course/" + courseId, changes);
  }
}
