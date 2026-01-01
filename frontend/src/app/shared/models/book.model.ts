export interface Book {
    id?: string;
    isbn: string;
    title: string;
    author: string;
    description?: string;
    condition: string;
    coverImage?: string;
    userUID: string;
    status: 'available' | 'swapped' | 'pending';
    // Add other fields as discovered
}
