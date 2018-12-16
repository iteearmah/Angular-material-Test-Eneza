export interface Course {
  data: CourseData[];
  meta: {
    current_page: string;
    from: string;
    last_page: string;
    path: string;
    per_page: string;
    to: string;
    total: string;
  };
}

export interface CourseData {
  id: string;
  name: string;
}
