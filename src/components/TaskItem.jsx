import React from 'react';

export default function TaskItem({ task, onToggleComplete, onDeleteTask }) {
  return (
    <li style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', borderBottom: '1px solid #eee' }}>
      <span
        onClick={() => onToggleComplete(task.id)}
        style={{
          cursor: 'pointer',
          textDecoration: task.completed ? 'line-through' : 'none',
          color: task.completed ? '#888' : '#333'
        }}
      >
        {task.text}
      </span>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button
          onClick={() => onToggleComplete(task.id)}
          style={{ padding: '0.4rem 0.6rem', background: task.completed ? '#6c757d' : '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          {task.completed ? 'Undo' : 'Complete'}
        </button>
        <button
          onClick={() => onDeleteTask(task.id)}
          style={{ padding: '0.4rem 0.6rem', background: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Delete
        </button>
      </div>
    </li>
  );
}