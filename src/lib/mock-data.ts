export type SiteSettings = {
  partnerName: string;
  birthDate: string;
  mainGreeting: string;
  musicUrl: string;
  musicTitle: string;
};

export const mockSettings: SiteSettings = {
  partnerName: "Sazkia Aurelia",
  birthDate: "2010-07-10",
  mainGreeting:
    "Selamat ulang tahun, sayangku. Setiap hari yang kulewati bersamamu terasa seperti hadiah, dan hari ini adalah harimu untuk dirayakan sepenuh hati. Semoga tahun ini membawa lebih banyak tawa, kejutan manis, dan mimpi-mimpi yang jadi nyata. Terima kasih sudah menjadi alasan aku tersenyum setiap hari. Aku mencintaimu, lebih dari yang bisa diucapkan kata-kata.",
  musicUrl: "/audio/our-song.mp3",
  musicTitle: "Shape Of My Heart",
};

export type Track = {
  id: string;
  title: string;
  url: string;
};

export const mockPlaylist: Track[] = [
  { id: "shape-of-my-heart", title: "Shape Of My Heart", url: "/audio/our-song.mp3" },
  { id: "about-you", title: "About You", url: "/audio/about-you.mp3" },
];

export type MemoryPhoto = {
  id: string;
  imageUrl: string;
  caption: string;
  sortOrder: number;
};

export const mockPhotos: MemoryPhoto[] = Array.from(
  { length: 12 },
  (_, index) => ({
    id: String(index + 1),
    imageUrl: `/photos/memory-${index + 1}.jpg`,
    caption: "",
    sortOrder: index + 1,
  })
);

export type SecretMessage = {
  id: string;
  passcode: string;
  letterContent: string;
  showNotification: boolean;
};

export const mockSecretMessage: SecretMessage = {
  id: "1",
  passcode: "100705",
  letterContent:
    "MANKK EAKKK DEKKKK.",
  showNotification: true,
};
