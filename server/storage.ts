import { users, demoRequests, type User, type InsertUser, type DemoRequest, type InsertDemoRequest } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createDemoRequest(demoRequest: InsertDemoRequest & { verificationToken: string }): Promise<DemoRequest>;
  getDemoRequestByToken(token: string): Promise<DemoRequest | undefined>;
  verifyDemoRequest(token: string): Promise<DemoRequest | undefined>;
  getDemoRequestByEmail(email: string): Promise<DemoRequest | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private demoRequests: Map<number, DemoRequest>;
  currentId: number;
  currentDemoId: number;

  constructor() {
    this.users = new Map();
    this.demoRequests = new Map();
    this.currentId = 1;
    this.currentDemoId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createDemoRequest(demoRequest: InsertDemoRequest & { verificationToken: string }): Promise<DemoRequest> {
    const id = this.currentDemoId++;
    const request: DemoRequest = {
      ...demoRequest,
      id,
      isVerified: false,
      createdAt: new Date(),
      verifiedAt: null,
    };
    this.demoRequests.set(id, request);
    return request;
  }

  async getDemoRequestByToken(token: string): Promise<DemoRequest | undefined> {
    return Array.from(this.demoRequests.values()).find(
      (request) => request.verificationToken === token,
    );
  }

  async verifyDemoRequest(token: string): Promise<DemoRequest | undefined> {
    const request = await this.getDemoRequestByToken(token);
    if (request) {
      request.isVerified = true;
      request.verifiedAt = new Date();
      this.demoRequests.set(request.id, request);
    }
    return request;
  }

  async getDemoRequestByEmail(email: string): Promise<DemoRequest | undefined> {
    return Array.from(this.demoRequests.values()).find(
      (request) => request.email === email && request.isVerified,
    );
  }
}

export const storage = new MemStorage();
