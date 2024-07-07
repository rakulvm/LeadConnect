import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult, DraggableProvided, DraggableStateSnapshot, DroppableProvided, DroppableStateSnapshot } from '@hello-pangea/dnd';
import { Contact } from '../types'; // Import the shared Contact type

type ContactWithInitial = Contact & {
  initial: string;
};

type ContactsState = {
  dontKeepInTouch: ContactWithInitial[];
  uncategorized: ContactWithInitial[];
  everyWeek: ContactWithInitial[];
  everyTwoWeeks: ContactWithInitial[];
  everyMonth: ContactWithInitial[];
  everyThreeMonths: ContactWithInitial[];
};

const categorizeContacts = (contacts: Contact[]): ContactsState => {
  const categorizedContacts: ContactsState = {
    dontKeepInTouch: [],
    uncategorized: [],
    everyWeek: [],
    everyTwoWeeks: [],
    everyMonth: [],
    everyThreeMonths: [],
  };

  contacts.forEach(contact => {
    const initial = contact.name.charAt(0);
    const categorizedContact: ContactWithInitial = { ...contact, initial };

    switch (contact.frequency) {
      case 'Weekly':
        categorizedContacts.everyWeek.push(categorizedContact);
        break;
      case 'Biweekly':
        categorizedContacts.everyTwoWeeks.push(categorizedContact);
        break;
      case 'Monthly':
        categorizedContacts.everyMonth.push(categorizedContact);
        break;
      case 'Once in 3 months':
        categorizedContacts.everyThreeMonths.push(categorizedContact);
        break;
      default:
        categorizedContacts.uncategorized.push(categorizedContact);
        break;
    }
  });

  return categorizedContacts;
};

type KeepInTouchProps = {
  contacts: Contact[];
};

const KeepInTouch: React.FC<KeepInTouchProps> = ({ contacts }) => {
  const [categorizedContacts, setCategorizedContacts] = useState<ContactsState>(() =>
    categorizeContacts(contacts)
  );

  useEffect(() => {
    setCategorizedContacts(categorizeContacts(contacts));
  }, [contacts]);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    const sourceList = Array.from(categorizedContacts[source.droppableId as keyof ContactsState]);
    const [movedItem] = sourceList.splice(source.index, 1);

    const destinationList = Array.from(categorizedContacts[destination.droppableId as keyof ContactsState]);
    destinationList.splice(destination.index, 0, movedItem);

    setCategorizedContacts({
      ...categorizedContacts,
      [source.droppableId]: sourceList,
      [destination.droppableId]: destinationList,
    });
  };

  return (
    <div className='p-6'>
      <h1 className='text-3xl font-bold mb-4'>Keep In Touch</h1>
      <p className='mb-6'>Set a frequency to reach out and build stronger relationships</p>
      <div className='mb-4'>
        <select className='p-2 border-slate-200 border-[1px] rounded'>
          <option>All Contacts</option>
        </select>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className='grid grid-cols-1 md:grid-cols-6 gap-4'>
          {Object.keys(categorizedContacts).map((key) => (
            <Droppable droppableId={key} key={key}>
              {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
                <div
                  className={`border-slate-200 border-[1px] p-2 rounded ${snapshot.isDraggingOver ? 'bg-blue-100' : 'bg-white'}`}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <h2 className='font-bold mb-2'>
                    {key.replace(/([a-z])([A-Z])/g, '$1 $2')}
                  </h2>
                  {categorizedContacts[key as keyof ContactsState].map((contact, index) => (
                    <Draggable
                      draggableId={contact.name}
                      index={index}
                      key={contact.name}
                    >
                      {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`flex items-center mb-2 p-2 border rounded ${snapshot.isDragging ? 'bg-blue-50' : 'bg-white'}`}
                        >
                          <div className='bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-2'>
                            {contact.initial}
                          </div>
                          {contact.name}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default KeepInTouch;
