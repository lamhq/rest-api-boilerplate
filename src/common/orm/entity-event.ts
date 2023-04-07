/**
 * Represents the different types of entity events that can occur.
 */
export enum EntityEvent {
  /**
   * Indicates that a new entity has been created.
   */
  Create = 'CREATE',

  /**
   * Indicates that an existing entity has been updated.
   */
  Update = 'UPDATE',

  /**
   * Indicates that an existing entity has been deleted.
   */
  Delete = 'DELETE',
}
