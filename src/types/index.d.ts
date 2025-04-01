type PostMetaData = {
  title: string;
  author: string;
  publishDate: string;
  slug: string;
  featuredImg?: string;
  description?: string;
};

export interface Post {
  id: string;
  collectionId: string;
  title: string;
  description: string;
  featuredImage: string;
  author: string;
  publishDate: string;
}

export interface TeamMember {
  id: string;
  name: string;
  profile_image: string;
  bio: string;
  role: string;
  collectionId: string;
  socials: {
    name: string;
    handle: string;
  };
}
