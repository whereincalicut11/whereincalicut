import { Search, MapPin, Users, Home } from 'lucide-react';

interface Filters {
  location: string;
  gender: string;
  type: string;
}

interface SearchFiltersProps {
  filters: Filters;
  onFilterChange: (key: keyof Filters, value: string) => void;
  onSearch: () => void;
}

export default function SearchFilters({ filters, onFilterChange, onSearch }: SearchFiltersProps) {
  const locations = [
    { value: '', label: 'All Locations' },
    { value: 'Nellikode', label: 'Nellikode (Near Cyberpark)' },
    { value: 'Kozhikode Beach', label: 'Kozhikode Beach' },
    { value: 'Chathamangalam', label: 'Chathamangalam (Near NIT)' },
    { value: 'Palazhi', label: 'Palazhi (Near Hilite Mall)' },
    { value: 'Mavoor Road', label: 'Mavoor Road (Metro Center)' },
    { value: 'Tenhipalam', label: 'Tenhipalam (Near University)' }
  ];

  const genders = [
    { value: '', label: 'Any Gender' },
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Family', label: 'Family' }
  ];

  const types = [
    { value: '', label: 'All Property Types' },
    { value: 'PG', label: 'PG / Co-living' },
    { value: 'Hostel', label: 'Hostel' },
    { value: 'Dormitory', label: 'Dormitory' },
    { value: 'Homestay', label: 'Homestay' }
  ];

  return (
    <div className="mx-auto -mt-8 max-w-4xl px-4 relative z-10">
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl sm:p-6 lg:p-8">
        <h2 className="font-heading text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span>Find Accommodations in Calicut</span>
        </h2>
        
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {/* Location Filter */}
          <div className="relative">
            <label htmlFor="location" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">
              Location
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">
                <MapPin className="h-5 w-5" />
              </div>
              <select
                id="location"
                value={filters.location}
                onChange={(e) => onFilterChange('location', e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 pl-10 pr-4 py-3 text-sm text-slate-700 outline-none focus:border-primary-500 focus:bg-white focus:ring-2 focus:ring-primary-500/10 min-h-[48px] appearance-none"
              >
                {locations.map((loc) => (
                  <option key={loc.value} value={loc.value}>
                    {loc.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Gender Filter */}
          <div className="relative">
            <label htmlFor="gender" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">
              Gender Preference
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">
                <Users className="h-5 w-5" />
              </div>
              <select
                id="gender"
                value={filters.gender}
                onChange={(e) => onFilterChange('gender', e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 pl-10 pr-4 py-3 text-sm text-slate-700 outline-none focus:border-primary-500 focus:bg-white focus:ring-2 focus:ring-primary-500/10 min-h-[48px] appearance-none"
              >
                {genders.map((g) => (
                  <option key={g.value} value={g.value}>
                    {g.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Property Type Filter */}
          <div className="relative">
            <label htmlFor="type" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">
              Property Type
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">
                <Home className="h-5 w-5" />
              </div>
              <select
                id="type"
                value={filters.type}
                onChange={(e) => onFilterChange('type', e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 pl-10 pr-4 py-3 text-sm text-slate-700 outline-none focus:border-primary-500 focus:bg-white focus:ring-2 focus:ring-primary-500/10 min-h-[48px] appearance-none"
              >
                {types.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Dynamic Summary / Clear Action */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-4 border-t border-slate-100">
          <p className="text-xs text-slate-500">
            * All listed accommodations are verified and offer direct owner contacts.
          </p>
          <button
            onClick={onSearch}
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary-600 to-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-primary-500/10 hover:from-primary-700 hover:to-indigo-700 active:scale-95 transition-all min-h-[44px]"
          >
            <Search className="h-4 w-4" />
            <span>Search Stays</span>
          </button>
        </div>
      </div>
    </div>
  );
}
