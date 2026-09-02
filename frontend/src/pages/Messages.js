import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { conversations } from '../data';

// Messages page with a conversation list and chat thread.
export default function Messages() {
  const [items, setItems] = useState(conversations);
  const [activeId, setActiveId] = useState(conversations[0].id);
  const [draft, setDraft] = useState('');

  const active = items.find((c) => c.id === activeId);

  const send = (e) => {
    e.preventDefault();
    if (!draft.trim()) return;
    const next = items.map((c) => {
      if (c.id !== activeId) return c;
      return {
        ...c,
        messages: [
          ...c.messages,
          { id: Date.now(), sender: 'me', text: draft },
        ],
      };
    });
    setItems(next);
    setDraft('');
  };

  return (
    <div>
      <h3 className="mb-3">Messages</h3>
      <div className="card">
        <div className="row g-0">
          {/* conversation list */}
          <div className="col-md-4 conv-list">
            {items.map((c) => (
              <div
                key={c.id}
                className={'conv-item d-flex align-items-center gap-2 ' + (c.id === activeId ? 'active' : '')}
                onClick={() => setActiveId(c.id)}
              >
                <div className="avatar-circle avatar-sm">{c.name.charAt(0)}</div>
                <div>
                  <div className="fw-medium small">{c.name}</div>
                  <div className="muted small">{c.last}</div>
                </div>
              </div>
            ))}
          </div>

          {/* chat thread */}
          <div className="col-md-8">
            <div className="card-header bg-white d-flex align-items-center gap-2">
              <div className="avatar-circle avatar-sm">{active.name.charAt(0)}</div>
              <div>
                <strong className="small">{active.name}</strong>
                <div className="muted" style={{ fontSize: 12 }}>{active.role}</div>
              </div>
            </div>
            <div className="chat-box p-3" style={{ minHeight: 320, overflowY: 'auto' }}>
              {active.messages.map((m) => (
                <div className={'chat-msg ' + m.sender} key={m.id}>
                  {m.text}
                </div>
              ))}
            </div>
            <form onSubmit={send} className="d-flex gap-2 p-3 border-top">
              <input
                type="text"
                className="form-control"
                placeholder="Type a message..."
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
              />
              <button type="submit" className="btn btn-primary">
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
