import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, UserPlus, Mail, Phone } from 'lucide-react';

interface Staff {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: 'admin' | 'moderator' | 'organizer';
  status: 'active' | 'inactive';
  joinDate: string;
  avatar: string;
}

export default function StaffManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);

  const staff: Staff[] = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah@company.com',
      phone: '+1 (555) 987-6543',
      role: 'admin',
      status: 'active',
      joinDate: '2024-01-15',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'michael@company.com',
      phone: '+1 (555) 876-5432',
      role: 'moderator',
      status: 'active',
      joinDate: '2024-02-20',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    {
      id: 3,
      name: 'Emma Davis',
      email: 'emma@company.com',
      phone: '+1 (555) 765-4321',
      role: 'organizer',
      status: 'active',
      joinDate: '2024-03-10',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100'
    }
  ];

  const [newStaff, setNewStaff] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'organizer' as Staff['role']
  });

  const filteredStaff = staff.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || member.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const getRoleColor = (role: Staff['role']) => {
    switch (role) {
      case 'admin':
        return { backgroundColor: '#fef2f2', color: '#dc2626' };
      case 'moderator':
        return { backgroundColor: '#eff6ff', color: '#2563eb' };
      case 'organizer':
        return { backgroundColor: '#B9FF5020', color: '#B9FF50' };
      default:
        return { backgroundColor: '#f3f4f6', color: '#374151' };
    }
  };

  const handleAddStaff = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Adding new staff:', newStaff);
    setNewStaff({ name: '', email: '', phone: '', role: 'organizer' });
    setShowAddForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Personal Administrativo</h1>
          <p className="text-gray-600">Gestiona el personal administrativo y sus permisos</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2" style={{ backgroundColor: '#B9FF50' }}
        >
          <Plus size={20} />
          <span>Agregar Personal</span>
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
             placeholder="Buscar personal..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
             className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
             className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg transition-colors" style={{ '--tw-ring-color': '#B9FF50' } as React.CSSProperties}
            />
          </div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
           className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
           className="border border-gray-300 rounded-lg px-3 py-2 transition-colors" style={{ '--tw-ring-color': '#B9FF50' } as React.CSSProperties}
          >
           <option value="all">Todos los Roles</option>
           <option value="admin">Administrador</option>
            <option value="moderator">Moderator</option>
           <option value="organizer">Organizador</option>
          </select>
        </div>
      </div>

      {/* Staff Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStaff.map((member) => (
          <div key={member.id} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{member.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(member.role)}`}>
                  <span className="px-2 py-1 rounded-full text-xs font-medium" style={getRoleColor(member.role)}>
                    {member.role === 'admin' ? 'Administrador' :
                     member.role === 'moderator' ? 'Moderador' :
                     member.role === 'organizer' ? 'Organizador' : member.role}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <button className="p-1.5 text-gray-600 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                  <Edit size={16} />
                </button>
                <button className="p-1.5 text-gray-600 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Mail size={14} />
                <span>{member.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={14} />
                <span>{member.phone}</span>
              </div>
              <div className="text-xs text-gray-500 mt-3">
                Se unió: {new Date(member.joinDate).toLocaleDateString('es-ES')}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Staff Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900">Agregar Nuevo Personal</h2>
              <button
                onClick={() => setShowAddForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <Plus className="rotate-45" size={24} />
              </button>
            </div>

            <form onSubmit={handleAddStaff} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nombre Completo *</label>
                <input
                  type="text"
                  required
                  value={newStaff.name}
                  onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg transition-colors" style={{ '--tw-ring-color': '#B9FF50' } as React.CSSProperties}
                  placeholder="Ingresa el nombre completo"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Correo Electrónico *</label>
                <input
                  type="email"
                  required
                  value={newStaff.email}
                  onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg transition-colors" style={{ '--tw-ring-color': '#B9FF50' } as React.CSSProperties}
                  placeholder="Ingresa el correo electrónico"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
                <input
                  type="tel"
                  value={newStaff.phone}
                  onChange={(e) => setNewStaff({ ...newStaff, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg transition-colors" style={{ '--tw-ring-color': '#B9FF50' } as React.CSSProperties}
                  placeholder="Ingresa el número de teléfono"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rol</label>
                <select
                  value={newStaff.role}
                  onChange={(e) => setNewStaff({ ...newStaff, role: e.target.value as Staff['role'] })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg transition-colors" style={{ '--tw-ring-color': '#B9FF50' } as React.CSSProperties}
                >
                  <option value="organizer">Organizador</option>
                  <option value="moderator">Moderador</option>
                  <option value="admin">Administrador</option>
                </select>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white rounded-lg transition-colors" style={{ backgroundColor: '#B9FF50' }}
                >
                  Agregar Personal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}