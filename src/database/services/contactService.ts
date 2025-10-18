// Contact messages database service
import path from 'path';
import { ContactMessage } from '../models';
import { dbConfig, readJsonFile, writeJsonFile, createBackup, initializeDatabase } from '../config';

class ContactService {
  private contactsFile = path.join(dbConfig.dataPath, 'contacts.json');

  constructor() {
    initializeDatabase();
  }

  // Save contact message
  async saveContact(contactData: Omit<ContactMessage, 'id' | 'createdAt' | 'isRead' | 'isReplied'>): Promise<ContactMessage | null> {
    try {
      const contacts = await readJsonFile<ContactMessage[]>(this.contactsFile) || [];
      
      const contact: ContactMessage = {
        ...contactData,
        id: `contact-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date().toISOString(),
        isRead: false,
        isReplied: false
      };

      contacts.push(contact);
      
      await createBackup('contacts.json');
      const success = await writeJsonFile(this.contactsFile, contacts);
      
      return success ? contact : null;
    } catch (error) {
      console.error('Error saving contact:', error);
      return null;
    }
  }

  // Get all contacts
  async getContacts(): Promise<ContactMessage[]> {
    try {
      return await readJsonFile<ContactMessage[]>(this.contactsFile) || [];
    } catch (error) {
      console.error('Error getting contacts:', error);
      return [];
    }
  }

  // Get unread contacts
  async getUnreadContacts(): Promise<ContactMessage[]> {
    const contacts = await this.getContacts();
    return contacts.filter(contact => !contact.isRead);
  }

  // Mark contact as read
  async markAsRead(contactId: string): Promise<boolean> {
    try {
      const contacts = await this.getContacts();
      const contactIndex = contacts.findIndex(c => c.id === contactId);
      
      if (contactIndex === -1) {
        return false;
      }

      contacts[contactIndex].isRead = true;
      
      await createBackup('contacts.json');
      return await writeJsonFile(this.contactsFile, contacts);
    } catch (error) {
      console.error('Error marking contact as read:', error);
      return false;
    }
  }

  // Mark contact as replied
  async markAsReplied(contactId: string): Promise<boolean> {
    try {
      const contacts = await this.getContacts();
      const contactIndex = contacts.findIndex(c => c.id === contactId);
      
      if (contactIndex === -1) {
        return false;
      }

      contacts[contactIndex].isReplied = true;
      contacts[contactIndex].isRead = true;
      
      await createBackup('contacts.json');
      return await writeJsonFile(this.contactsFile, contacts);
    } catch (error) {
      console.error('Error marking contact as replied:', error);
      return false;
    }
  }

  // Delete contact
  async deleteContact(contactId: string): Promise<boolean> {
    try {
      const contacts = await this.getContacts();
      const filteredContacts = contacts.filter(c => c.id !== contactId);
      
      if (contacts.length === filteredContacts.length) {
        return false; // Contact not found
      }

      await createBackup('contacts.json');
      return await writeJsonFile(this.contactsFile, filteredContacts);
    } catch (error) {
      console.error('Error deleting contact:', error);
      return false;
    }
  }

  // Get contact statistics
  async getContactStats() {
    try {
      const contacts = await this.getContacts();
      
      return {
        total: contacts.length,
        unread: contacts.filter(c => !c.isRead).length,
        replied: contacts.filter(c => c.isReplied).length,
        pending: contacts.filter(c => c.isRead && !c.isReplied).length
      };
    } catch (error) {
      console.error('Error getting contact stats:', error);
      return { total: 0, unread: 0, replied: 0, pending: 0 };
    }
  }
}

// Export singleton instance
export const contactService = new ContactService();