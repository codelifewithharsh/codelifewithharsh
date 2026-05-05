export type Subscriber = {
  id: string;
  email: string;
  created_at: string;
  source: string;
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
  is_read: boolean;
};

export type CourseProgress = {
  id: string;
  session_id: string;
  module_id: string;
  completed_at: string;
};
