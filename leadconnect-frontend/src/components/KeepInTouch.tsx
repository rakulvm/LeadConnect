import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';

type Contact = {
  name: string;
  initial: string;
};

type ContactsState = {
  dontKeepInTouch: Contact[];
  uncategorized: Contact[];
  everyWeek: Contact[];
  everyTwoWeeks: Contact[];
  everyMonth: Contact[];
  everyThreeMonths: Contact[];
};

const initialData: ContactsState = {
  dontKeepInTouch: [{ name: 'Aaron Kalb', initial: 'A' }],
  uncategorized: [{ name: 'Aishwarya Mahesh', initial: 'A' }],
  everyWeek: [{ name: 'Adam Kell', initial: 'A' }],
  everyTwoWeeks: [{ name: 'Adrian Sanborn', initial: 'A' }],
  everyMonth: [{ name: 'Adam Guild', initial: 'A' }],
  everyThreeMonths: [{ name: 'Albert Chow', initial: 'A' }],
};

const KeepInTouch: React.FC = () => {
  const [contacts, setContacts] = useState<ContactsState>(initialData);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    const sourceList = Array.from(contacts[source.droppableId as keyof ContactsState]);
    const [movedItem] = sourceList.splice(source.index, 1);

    const destinationList = Array.from(contacts[destination.droppableId as keyof ContactsState]);
    destinationList.splice(destination.index, 0, movedItem);

    setContacts({
      ...contacts,
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
          {Object.keys(contacts).map((key) => (
            <Droppable droppableId={key} key={key}>
              {(provided, snapshot) => (
                <div
                  className={`border-slate-200 border-[1px] p-2 rounded ${snapshot.isDraggingOver ? 'bg-blue-100' : 'bg-white'}`}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <h2 className='font-bold mb-2'>
                    {key.replace(/([a-z])([A-Z])/g, '$1 $2')}
                  </h2>
                  {contacts[key as keyof ContactsState].map((contact, index) => (
                    <Draggable
                      draggableId={contact.name}
                      index={index}
                      key={contact.name}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className='flex items-center mb-2 p-2 border rounded bg-white'
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
