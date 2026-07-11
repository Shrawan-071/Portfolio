import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Send, MessageSquare, Check, Sparkles, AlertCircle } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [showOptions, setShowOptions] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) {
      setStatus('error');
      return;
    }

    setStatus('idle');
    setShowOptions(true);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
    if (status === 'error') setStatus('idle');
  };

  const whatsappText = `Hello Shrawan,

Name: ${formState.name}
Email: ${formState.email}
Subject: ${formState.subject || 'No Subject'}
Message: ${formState.message}`;

  const whatsappUrl = `https://wa.me/9779826228728?text=${encodeURIComponent(whatsappText)}`;

  const emailSubject = formState.subject || `Message from ${formState.name}`;
  const emailBody = `Hello Shrawan,

Name: ${formState.name}
Email: ${formState.email}

Message:
${formState.message}`;

  const mailtoUrl = `mailto:shrawan.edu.117@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

  return (
    <section id="contact" className="relative py-24 px-6 md:px-12 overflow-hidden bg-gradient-to-b from-transparent via-[#030308]/30 to-[#020205]">
      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16" id="contact-section-header">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-3"
          >
            <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-mono text-[10px] text-cyan-400 font-semibold tracking-wider uppercase">
              Get In Touch
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-sans font-extrabold text-3xl md:text-4xl text-white tracking-tight"
          >
            Let's Build Something Meaningful
          </motion.h2>
          <div className="w-12 h-1 bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch" id="contact-content-grid">
          
          {/* Left Column: Direct info nodes */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col justify-between p-8 rounded-2xl bg-slate-900/40 border border-white/10 backdrop-blur-xl relative overflow-hidden"
            id="contact-info-panel"
          >
            {/* Visual glow circles */}
            <div className="absolute -bottom-16 -left-16 w-36 h-36 rounded-full bg-cyan-500/5 blur-3xl -z-10" />

            <div id="contact-info-top">
              <h3 className="font-sans font-extrabold text-lg text-white mb-4 tracking-tight">
                Connection Channels
              </h3>
              <p className="font-sans text-xs text-gray-400 leading-relaxed mb-8">
                I’m open to connecting about technology, projects, collaboration, learning opportunities, and software development. Feel free to reach out via email, phone, or any of my social profiles.
              </p>

              {/* Information Cards */}
              <div className="space-y-5" id="contact-info-channels">
                {/* Email Channel */}
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/20 border border-white/10 hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all group cursor-pointer"
                  id="contact-channel-email"
                >
                  <div className="p-3 rounded-lg bg-cyan-500/10 text-cyan-400 group-hover:scale-105 transition-transform">
                    <Mail className="w-4.5 h-4.5" />
                  </div>
                  <div className="text-left">
                    <span className="block font-mono text-[10px] text-gray-500 tracking-wider font-bold uppercase">Email Address</span>
                    <span className="font-sans text-sm text-gray-200 group-hover:text-white transition-colors">{personalInfo.email}</span>
                  </div>
                </a>

                {/* Phone Channels */}
                <div className="p-4 rounded-xl bg-slate-900/20 border border-white/10 flex flex-col gap-3" id="contact-channel-phone">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-blue-500/10 text-blue-400">
                      <Phone className="w-4.5 h-4.5" />
                    </div>
                    <div className="text-left">
                      <span className="block font-mono text-[10px] text-gray-500 tracking-wider font-bold uppercase">Direct Telephones</span>
                      <div className="flex flex-col gap-1 mt-1">
                        {personalInfo.phones.map((phone, pIdx) => (
                          <a
                            key={pIdx}
                            href={`tel:${phone}`}
                            className="font-mono text-xs text-gray-300 hover:text-cyan-400 transition-colors"
                          >
                            {phone}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Location Channel */}
                <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/20 border border-white/10" id="contact-channel-location">
                  <div className="p-3 rounded-lg bg-violet-500/10 text-violet-400">
                    <MapPin className="w-4.5 h-4.5" />
                  </div>
                  <div className="text-left">
                    <span className="block font-mono text-[10px] text-gray-500 tracking-wider font-bold uppercase">HQ Location</span>
                    <span className="font-sans text-sm text-gray-200">{personalInfo.location}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Location status message */}
            <div className="mt-8 pt-6 border-t border-white/5 flex items-center gap-2" id="contact-info-footer">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-[10px] text-gray-500 tracking-widest font-bold uppercase">AVAILABLE FOR WORK OPPORTUNITIES</span>
            </div>
          </motion.div>

          {/* Right Column: Interactive contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 p-8 rounded-2xl bg-slate-900/40 border border-white/10 backdrop-blur-xl relative flex flex-col justify-center min-h-[480px]"
            id="contact-form-panel"
          >
            <AnimatePresence mode="wait">
              {!showOptions ? (
                <motion.div
                  key="form-fields"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="font-sans font-extrabold text-lg text-white mb-6 text-left tracking-tight">
                    Transmit a Message
                  </h3>

                  {/* Submission alert feedback */}
                  <AnimatePresence mode="wait">
                    {status === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-2.5 text-red-400 text-xs font-sans font-semibold text-left"
                        id="contact-alert-error"
                      >
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>Please fill out all required fields (Name, Email, and Message).</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <form onSubmit={handleSubmit} className="space-y-5 text-left" id="contact-form-element">
                    {/* Name & Email row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block font-mono text-[10px] text-gray-400 font-bold tracking-wider uppercase mb-2">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formState.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          placeholder="Enter full name"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-sans text-xs focus:outline-none focus:border-cyan-500/50 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[10px] text-gray-400 font-bold tracking-wider uppercase mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={formState.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="name@example.com"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-sans text-xs focus:outline-none focus:border-cyan-500/50 transition-colors"
                        />
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <label className="block font-mono text-[10px] text-gray-400 font-bold tracking-wider uppercase mb-2">
                        Subject Theme
                      </label>
                      <input
                        type="text"
                        value={formState.subject}
                        onChange={(e) => handleInputChange('subject', e.target.value)}
                        placeholder="Inquiry Topic / Project Name"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-sans text-xs focus:outline-none focus:border-cyan-500/50 transition-colors"
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block font-mono text-[10px] text-gray-400 font-bold tracking-wider uppercase mb-2">
                        Message Content *
                      </label>
                      <textarea
                        required
                        rows={5}
                        value={formState.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        placeholder="Describe your inquiry or message here..."
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-sans text-xs focus:outline-none focus:border-cyan-500/50 transition-colors resize-none"
                      />
                    </div>

                    {/* Submit button */}
                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 hover:opacity-95 text-white font-sans font-semibold text-sm shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 group cursor-pointer"
                      id="contact-form-submit-btn"
                    >
                      <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      <span>Transmit Message</span>
                    </button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="choice-screen"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center justify-center text-center py-6"
                >
                  <div className="p-4 rounded-full bg-cyan-500/10 text-cyan-400 mb-6 relative">
                    <Sparkles className="w-8 h-8 animate-pulse text-cyan-400" />
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
                    </span>
                  </div>

                  <h3 className="font-sans font-extrabold text-xl text-white mb-2 tracking-tight">
                    Choose how you want to send your message
                  </h3>
                  <p className="font-sans text-xs text-gray-400 max-w-sm mb-8 leading-relaxed">
                    Select your preferred transmission channel below. This will open the prepared content in the chosen application for your final verification and sending.
                  </p>

                  <div className="w-full space-y-4 max-w-sm">
                    {/* Send via WhatsApp */}
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => {
                        setStatus('success');
                      }}
                      className="flex items-center justify-center gap-3 w-full py-3.5 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-sans font-semibold text-sm transition-all shadow-lg shadow-emerald-500/15 hover:shadow-emerald-500/30 cursor-pointer group"
                      id="send-whatsapp-btn"
                    >
                      <MessageSquare className="w-4.5 h-4.5 group-hover:scale-110 transition-transform" />
                      <span>Send via WhatsApp</span>
                    </a>

                    {/* Send via Email */}
                    <a
                      href={mailtoUrl}
                      onClick={() => {
                        setStatus('success');
                      }}
                      className="flex items-center justify-center gap-3 w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 hover:opacity-95 text-white font-sans font-semibold text-sm transition-all shadow-lg shadow-cyan-500/15 hover:shadow-cyan-500/30 cursor-pointer group"
                      id="send-email-btn"
                    >
                      <Mail className="w-4.5 h-4.5 group-hover:scale-110 transition-transform" />
                      <span>Send via Email</span>
                    </a>

                    {/* Success prompt */}
                    <AnimatePresence>
                      {status === 'success' && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-sans font-semibold text-center mt-4"
                        >
                          <Check className="w-3.5 h-3.5 inline mr-1.5 align-middle" />
                          <span className="align-middle">Transmission initiated. Please verify and hit send in your application!</span>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Action buttons to edit/reset */}
                    <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-6 w-full">
                      <button
                        type="button"
                        onClick={() => {
                          setStatus('idle');
                          setShowOptions(false);
                        }}
                        className="text-gray-400 hover:text-white font-sans text-xs transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        ← Edit Message
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setStatus('idle');
                          setShowOptions(false);
                          setFormState({ name: '', email: '', subject: '', message: '' });
                        }}
                        className="text-red-400/80 hover:text-red-400 font-sans text-xs transition-colors cursor-pointer"
                      >
                        Reset Form
                      </button>
                    </div>

                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
