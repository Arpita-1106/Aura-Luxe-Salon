import React from 'react';
import { X, Clock, Sparkles, Check, ArrowRight, ShieldCheck, HeartHandshake } from 'lucide-react';
import { ServiceItem } from '../types';
import { formatINR } from '../utils/booking';

interface RitualDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onSelectForBooking: (serviceId: string) => void;
}

export const RitualDetailModal: React.FC<RitualDetailModalProps> = ({
  service,
  onClose,
  onSelectForBooking
}) => {
  if (!service) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-[#221F20]/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative bg-[#FAF7F2] w-full max-w-3xl rounded-lg border border-[#EAE3DA] shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 backdrop-blur-md text-[#221F20] hover:bg-[#8C4A4A] hover:text-white transition-colors"
          aria-label="Close Ritual Details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header Banner */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden">
          <img
            src={service.imageUrl}
            alt={service.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#221F20] via-[#221F20]/40 to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
            {service.tag && (
              <span className="inline-block px-3 py-0.5 rounded-full text-[11px] font-semibold bg-[#DFBE9F] text-[#221F20] uppercase tracking-wider">
                {service.tag}
              </span>
            )}
            <h2 id="modal-title" className="font-serif text-2xl sm:text-3xl font-medium text-white leading-tight">
              {service.title}
            </h2>
            <div className="flex flex-wrap items-center gap-4 text-xs text-white/90">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#DFBE9F]" />
                {service.durationMinutes} Minutes Unhurried Ceremony
              </span>
              <span>·</span>
              <span className="font-semibold text-[#DFBE9F]">
                {formatINR(service.priceINR)}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Summary */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.08em] text-[#8C4A4A] mb-2">
              Ceremonial Philosophy
            </h3>
            <p className="font-sans text-sm sm:text-base text-[#5E5557] leading-relaxed">
              {service.description}
            </p>
          </div>

          {/* Ceremony Steps Breakdown */}
          <div className="space-y-4 pt-2 border-t border-[#EAE3DA]">
            <h3 className="text-xs font-semibold uppercase tracking-[0.08em] text-[#8C4A4A]">
              The Four Sacred Ceremony Movements
            </h3>

            <div className="space-y-3">
              {service.ritualSteps.map((step) => (
                <div
                  key={step.stepNumber}
                  className="bg-white p-4 rounded-md border border-[#EAE3DA] flex items-start gap-3.5"
                >
                  <span className="w-6 h-6 rounded-full bg-[#F5EBEB] text-[#8C4A4A] font-serif font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {step.stepNumber}
                  </span>
                  <div>
                    <h4 className="font-serif text-sm font-semibold text-[#221F20]">
                      {step.name}
                    </h4>
                    <p className="font-sans text-xs text-[#5E5557] leading-relaxed mt-1">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Botanical Ingredients */}
          <div className="pt-2 border-t border-[#EAE3DA]">
            <h3 className="text-xs font-semibold uppercase tracking-[0.08em] text-[#8C4A4A] mb-2">
              Key Botanical Actives & Extracts
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {service.botanicalIngredients.map((ing, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-[#5E5557] bg-[#F4EFEB] px-3 py-2 rounded">
                  <Sparkles className="w-3.5 h-3.5 text-[#DFBE9F] shrink-0" />
                  <span>{ing}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended For & Preparation */}
          <div className="bg-[#F5EBEB] p-4 rounded-md border border-[#D49B9B]/40 space-y-2 text-xs text-[#5E5557]">
            <p>
              <strong className="text-[#8C4A4A]">Recommended For:</strong> {service.bestFor}
            </p>
            <p className="text-[11px] text-[#8C8284]">
              *Patrons are invited to arrive 15 minutes prior to appointment to indulge in our complimentary Himalayan Singing Bowl arrival welcome and warm Kashmiri Kahwa tea.
            </p>
          </div>
        </div>

        {/* Modal Actions Footer */}
        <div className="p-6 bg-[#F4EFEB] border-t border-[#EAE3DA] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-[10px] text-[#8C8284] uppercase tracking-wider block">Total Honorarium</span>
            <span className="font-serif text-2xl font-semibold text-[#8C4A4A]">
              {formatINR(service.priceINR)}
            </span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-1/2 sm:w-auto btn-secondary text-xs"
            >
              Close
            </button>
            <button
              onClick={() => {
                onSelectForBooking(service.id);
                onClose();
              }}
              className="w-1/2 sm:w-auto btn-primary text-xs"
            >
              <span>Reserve This Ritual</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
