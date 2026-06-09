export type Suit = "♠" | "♥" | "♦" | "♣";
export type Rank = "A" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "J" | "Q" | "K";
export interface Card { suit: Suit; rank: Rank; }

export interface Player {
  id: string;
  name: string;
  avatar: string;
  coins: number;
  bet?: number;
  cards?: Card[];
  isDealer?: boolean;
  isReady?: boolean;
  isYou?: boolean;
}

export interface Room {
  id: string;
  name: string;
  minBet: number;
  players: number;
  maxPlayers: number;
  status: "waiting" | "playing" | "full";
}

export const mockUser = {
  username: "TaroKing",
  phone: "+95 9 123 456 789",
  avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Taro&backgroundColor=b6e3f4",
  coins: 25400,
  wins: 142,
  losses: 78,
  joined: "Jan 2025",
};

export const mockRooms: Room[] = [
  { id: "r1", name: "Golden Palace", minBet: 100, players: 4, maxPlayers: 5, status: "waiting" },
  { id: "r2", name: "Ruby Lounge", minBet: 500, players: 5, maxPlayers: 5, status: "full" },
  { id: "r3", name: "Diamond Hall", minBet: 1000, players: 2, maxPlayers: 5, status: "waiting" },
  { id: "r4", name: "Royal Suite", minBet: 2500, players: 3, maxPlayers: 5, status: "playing" },
  { id: "r5", name: "VIP Vault", minBet: 5000, players: 1, maxPlayers: 5, status: "waiting" },
];

const av = (s: string) => `https://api.dicebear.com/7.x/adventurer/svg?seed=${s}`;

export const mockPlayers: Player[] = [
  { id: "p1", name: "You", avatar: av("Taro"), coins: 25400, isYou: true, isReady: true, bet: 500, cards: [{ suit: "♠", rank: "K" }, { suit: "♥", rank: "9" }] },
  { id: "p2", name: "Khun Aung", avatar: av("Aung"), coins: 12300, isDealer: true, bet: 0, cards: [{ suit: "♦", rank: "Q" }, { suit: "♣", rank: "8" }] },
  { id: "p3", name: "Mya", avatar: av("Mya"), coins: 8700, isReady: true, bet: 500, cards: [{ suit: "♥", rank: "5" }, { suit: "♠", rank: "4" }] },
  { id: "p4", name: "Zaw", avatar: av("Zaw"), coins: 34200, isReady: true, bet: 500, cards: [{ suit: "♣", rank: "A" }, { suit: "♦", rank: "7" }] },
  { id: "p5", name: "Nilar", avatar: av("Nilar"), coins: 5400, isReady: false, bet: 500, cards: [{ suit: "♠", rank: "10" }, { suit: "♥", rank: "J" }] },
];

export const mockMatches = [
  { id: "m1", date: "Today, 14:32", room: "Golden Palace", result: "win", amount: 1200 },
  { id: "m2", date: "Today, 13:10", room: "Ruby Lounge", result: "loss", amount: -800 },
  { id: "m3", date: "Yesterday", room: "Diamond Hall", result: "win", amount: 2400 },
  { id: "m4", date: "Yesterday", room: "Royal Suite", result: "win", amount: 600 },
  { id: "m5", date: "2 days ago", room: "VIP Vault", result: "loss", amount: -3000 },
];

export const mockAnnouncement = "🎉 Weekend Tournament — Prize Pool 1,000,000 coins!";
export const onlineCount = 1247;
