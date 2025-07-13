import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { PenLine } from 'lucide-react';

export const WriteToMeModal = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState('');
  const [isSending, setIsSending] = useState(false);

  const openModal = () => {
    setIsOpen(true);
    setStatus('');
  };

  const closeModal = () => {
    setIsOpen(false);
    setStatus('');
    setIsSending(false);
  };

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current || isSending) return;

    setIsSending(true);

    const timestamp = new Date().toLocaleString();
    const formData = new FormData(formRef.current);
    formData.append("timestamp", timestamp);

    try {
      await emailjs.send(
        "service_xt6xwyn",
        "template_xz0xnfy",
        {
          user_name: formData.get("user_name"),
          name: formData.get("user_name"),
          email: formData.get("email"),
          user_message: formData.get("user_message"),
          timestamp,
        },
        "-babpC7AqHUik9-yF"
      );

      setStatus("✅ Thank you! Your message has been sent.");
      formRef.current?.reset();
    } catch (err) {
      console.error("Email sending error:", err);
      setStatus("❌ Failed to send. Please try again later.");
    }

    setIsSending(false);
  };

  return (
    <>
      {/* Floating Write to Me Button */}
      <div
        role="button"
        onClick={openModal}
        style={{
          position: 'fixed',
          left: '1.5rem',
          bottom: '3.2rem',
          zIndex: 150,
          backgroundColor: 'white',
          color: 'black',
          fontWeight: 'bold',
          padding: '0.5rem 1.0rem',
          borderRadius: '9999px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          cursor: 'pointer',
          transition: 'transform 0.3s ease',
        }}
        onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
        onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
      >
        <PenLine style={{ width: '20px', height: '20px' }} /> Write to Me
      </div>

      {/* Modal */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'linear-gradient(to bottom right, rgba(0,0,0,0.7), rgba(128,0,128,0.4))',
            zIndex: 120,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '1rem',
            backdropFilter: 'blur(4px)',
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '1rem',
              padding: '1.5rem',
              maxWidth: '400px',
              width: '100%',
              position: 'relative',
              boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
            }}
          >
            <button
              onClick={closeModal}
              style={{
                position: 'absolute',
                top: '0.5rem',
                right: '0.75rem',
                fontSize: '1.25rem',
                color: '#666',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              ×
            </button>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#9333ea', marginBottom: '1rem' }}>
              Leave a Message
            </h3>

            <form ref={formRef} onSubmit={sendEmail} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', color: '#4b0082' }}>
              <div>
                <label htmlFor="user_name" style={{ display: 'block', fontWeight: 500, marginBottom: '0.25rem', color: '#6b21a8' }}>
                  Your Name
                </label>
                <input
                  type="text"
                  id="user_name"
                  name="user_name"
                  required
                  style={{
                    width: '100%',
                    border: '1px solid #ccc',
                    borderRadius: '6px',
                    padding: '0.5rem 0.75rem',
                    outlineColor: '#9333ea',
                  }}
                />
              </div>
              <div>
                <label htmlFor="email" style={{ display: 'block', fontWeight: 500, marginBottom: '0.25rem', color: '#6b21a8' }}>
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  style={{
                    width: '100%',
                    border: '1px solid #ccc',
                    borderRadius: '6px',
                    padding: '0.5rem 0.75rem',
                    outlineColor: '#9333ea',
                  }}
                />
              </div>
              <div>
                <label htmlFor="user_message" style={{ display: 'block', fontWeight: 500, marginBottom: '0.25rem', color: '#6b21a8' }}>
                  Your Message
                </label>
                <textarea
                  id="user_message"
                  name="user_message"
                  rows={4}
                  required
                  style={{
                    width: '100%',
                    border: '1px solid #ccc',
                    borderRadius: '6px',
                    padding: '0.5rem 0.75rem',
                    resize: 'none',
                    outlineColor: '#9333ea',
                  }}
                />
              </div>

              {/* Buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button
                  type="button"
                  onClick={closeModal}
                  style={{
                    background: 'none',
                    color: '#666',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSending}
                  style={{
                    backgroundColor: '#9333ea',
                    color: 'white',
                    border: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    opacity: isSending ? 0.6 : 1,
                  }}
                >
                  {isSending ? 'Sending...' : 'Send'}
                </button>
              </div>

              {status && (
                <p style={{ fontSize: '0.875rem', marginTop: '0.75rem', textAlign: 'center', color: status.includes("✅") ? 'green' : 'red' }}>
                  {status}
                </p>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
};
