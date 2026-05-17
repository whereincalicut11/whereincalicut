import { Link } from 'react-router-dom';
import { Star, MapPin, ArrowRight, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Stay } from '../data/stays';

interface StayCardProps {
  stay: Stay;
}

export default function StayCard({ stay }: StayCardProps) {
  // Determine badge colors based on gender preference
  const getGenderBadgeStyles = (gender: Stay['gender']) => {
    switch (gender) {
      case 'Male':
        return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'Female':
        return 'bg-rose-50 text-rose-700 border-rose-100';
      case 'Family':
        return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4 }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300"
    >
      {/* Property Image Container */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
        <img
          src={stay.image}
          alt={stay.title}
          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />
        
        {/* Verified Badge */}
        <div className="absolute top-4 left-4 flex items-center gap-1 rounded-full bg-slate-900/80 backdrop-blur-md px-2.5 py-1 text-[11px] font-bold text-white shadow-sm">
          <Shield className="h-3 w-3 text-accent-emerald" />
          <span>Verified Listing</span>
        </div>

        {/* Floating Property Type Tag */}
        <span className="absolute bottom-4 left-4 rounded-xl bg-white px-3 py-1 text-xs font-bold text-slate-800 shadow-sm border border-slate-100">
          {stay.type}
        </span>
      </div>

      {/* Property Details */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-2 mb-2">
          {/* Gender Preference Badge */}
          <span className={`rounded-lg border px-2 py-0.5 text-xs font-bold ${getGenderBadgeStyles(stay.gender)}`}>
            {stay.gender === 'Any' ? 'Co-living (Any)' : `${stay.gender} Only`}
          </span>

          {/* Rating */}
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="text-xs font-bold text-slate-700">{stay.rating}</span>
            <span className="text-[10px] text-slate-400">({stay.reviewsCount})</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-heading text-lg font-bold text-slate-800 leading-snug group-hover:text-primary-600 transition-colors mb-2">
          {stay.title}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-1 text-xs text-slate-500 mb-4">
          <MapPin className="h-3.5 w-3.5 flex-shrink-0 text-slate-400" />
          <span className="truncate">{stay.location}</span>
        </div>

        {/* Amenities Icons Row (Quick view) */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {stay.amenities.slice(0, 3).map((amenity, index) => (
            <span key={index} className="rounded-lg bg-slate-50 border border-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600">
              {amenity}
            </span>
          ))}
          {stay.amenities.length > 3 && (
            <span className="rounded-lg bg-slate-50 border border-slate-100 px-2 py-0.5 text-[10px] font-semibold text-primary-500">
              +{stay.amenities.length - 3} More
            </span>
          )}
        </div>

        {/* Price & Action Row */}
        <div className="mt-auto flex items-center justify-between gap-4 border-t border-slate-100 pt-4">
          <div>
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Starting From</p>
            <p className="font-heading text-lg font-extrabold text-slate-800">
              ₹{stay.price.toLocaleString('en-IN')}
              <span className="text-xs font-normal text-slate-500">/mo</span>
            </p>
          </div>
          
          <Link
            to={`/stay/${stay.id}`}
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary-600 hover:bg-primary-600 hover:text-white transition-colors duration-200"
            aria-label={`View details of ${stay.title}`}
          >
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
