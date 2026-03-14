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
        className="fixed left-4 bottom-6 md:left-6 md:bottom-6 z-[150] bg-gradient-to-r from-black to-gray-900 border-2 border-red-500 hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600 text-white font-bold px-4 py-3 md:px-5 md:py-3 rounded-full shadow-xl shadow-red-500/30 hover:shadow-2xl hover:shadow-red-500/50 flex items-center gap-2 cursor-pointer transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 text-sm md:text-base"
      >
        <PenLine className="w-4 h-4 md:w-5 md:h-5" />
        <span className="hidden sm:inline">Write to Me</span>
        <span className="sm:hidden">Message</span>
      </div>

      {/* Modal */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'linear-gradient(to bottom right, rgba(0,0,0,0.95), rgba(26,26,26,0.9))',
            zIndex: 120,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '1rem',
            backdropFilter: 'blur(8px)',
          }}
        >
          <div
            style={{
              backgroundColor: '#0a0a0a',
              borderRadius: '1rem',
              padding: '1.5rem',
              maxWidth: '400px',
              width: '100%',
              position: 'relative',
              boxShadow: '0 0 40px rgba(239, 68, 68, 0.3)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
            }}
          >
            <button
              onClick={closeModal}
              style={{
                position: 'absolute',
                top: '0.5rem',
                right: '0.75rem',
                fontSize: '1.25rem',
                color: '#ef4444',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              ×
            </button>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#ef4444', marginBottom: '1rem', textShadow: '0 0 10px rgba(239, 68, 68, 0.5)' }}>
              Leave a Message
            </h3>

            <form ref={formRef} onSubmit={sendEmail} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', color: '#f3f4f6' }}>
              <div>
                <label htmlFor="user_name" style={{ display: 'block', fontWeight: 500, marginBottom: '0.25rem', color: '#e5e7eb' }}>
                  Your Name
                </label>
                <input
                  type="text"
                  id="user_name"
                  name="user_name"
                  required
                  style={{
                    width: '100%',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    borderRadius: '6px',
                    padding: '0.5rem 0.75rem',
                    outlineColor: '#ef4444',
                    backgroundColor: '#1a1a1a',
                    color: '#f3f4f6',
                  }}
                />
              </div>
              <div>
                <label htmlFor="email" style={{ display: 'block', fontWeight: 500, marginBottom: '0.25rem', color: '#e5e7eb' }}>
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  style={{
                    width: '100%',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    borderRadius: '6px',
                    padding: '0.5rem 0.75rem',
                    outlineColor: '#ef4444',
                    backgroundColor: '#1a1a1a',
                    color: '#f3f4f6',
                  }}
                />
              </div>
              <div>
                <label htmlFor="user_message" style={{ display: 'block', fontWeight: 500, marginBottom: '0.25rem', color: '#e5e7eb' }}>
                  Your Message
                </label>
                <textarea
                  id="user_message"
                  name="user_message"
                  rows={4}
                  required
                  style={{
                    width: '100%',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    borderRadius: '6px',
                    padding: '0.5rem 0.75rem',
                    resize: 'none',
                    outlineColor: '#ef4444',
                    backgroundColor: '#1a1a1a',
                    color: '#f3f4f6',
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
                    color: '#9ca3af',
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
                    backgroundColor: '#ef4444',
                    color: 'white',
                    border: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    opacity: isSending ? 0.6 : 1,
                    boxShadow: '0 0 20px rgba(239, 68, 68, 0.3)',
                  }}
                >
                  {isSending ? 'Sending...' : 'Send'}
                </button>
              </div>

              {status && (
                <p style={{ fontSize: '0.875rem', marginTop: '0.75rem', textAlign: 'center', color: status.includes("✅") ? '#10b981' : '#ef4444' }}>
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
