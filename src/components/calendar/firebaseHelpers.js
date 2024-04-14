import {
  collection,
  query,
  where,
  doc,
  getDocs,
  deleteDoc,
  Timestamp,
} from 'firebase/firestore';

import { db } from '@/firebase/config';

/*
 * Fetches all calendar entries for the current week
 * @param {array} weekDays - array of day objects with date and entries properties
 * @param {string} plannerId - Id of the users planner
 * @return {DocumentSnapshot} entries - calendat entries for the week
 */
export const getWeeklyEntries = async (weekDays, plannerId) => {
  const entriesRef = collection(db, 'calendar-entries');
  const startFullDate = Timestamp.fromDate(new Date(weekDays[0].date));
  const endFullDate = Timestamp.fromDate(new Date(weekDays[6].date));

  const q = query(
    entriesRef,
    where('plannerId', '==', plannerId),
    where('date', '>=', startFullDate),
    where('date', '<=', endFullDate)
  );

  return await getDocs(q);
};

/*
 * Deletes an existing calendar entry
 * @param {string} entryId - ID of calendar entry to be deleted
 */
export const deleteEntry = async (entryId) => {
  await deleteDoc(doc(db, 'calendar-entries', entryId));
};
