export type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
};

export type Event = {
  id: string;
  title: string;
  description: string;
  location: string;
  dateTime: string;
  endDateTime: string;
  category: string;
  imageUrl: string;
  organizerId: string;

  organizer?: {
    name: string;
    email: string;
    avatarUrl?: string;
  };

  attendeeIds: string[];

  volunteers?: {
    id: string;
    name: string;
    avatarUrl?: string;
  }[];

  guidelines?: string[];

  createdAt: string;
};

export type EventFormValues = {
  title: string;
  description: string;
  location: string;
  dateTime: string;
  endDateTime: string;
  category: string;
  imageUrl: string;
};


