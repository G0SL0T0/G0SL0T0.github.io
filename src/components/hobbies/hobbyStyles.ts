// src/components/hobbies/hobbyStyles.ts - обновленная версия
export const getHobbyStyles = (id: string) => {
  switch(id) {
    case 'games':
      return {
        iconBg: 'linear-gradient(135deg, #007bff, #0056b3)',
        buttonBg: 'linear-gradient(135deg, #007bff, #0056b3)',
        accentColor: '#007bff',
        icon: 'fas fa-gamepad'
      };
    case 'books':
      return {
        iconBg: 'linear-gradient(135deg, #28a745, #1e7e34)',
        buttonBg: 'linear-gradient(135deg, #28a745, #1e7e34)',
        accentColor: '#28a745',
        icon: 'fas fa-book'
      };
    case 'electronics':
      return {
        iconBg: 'linear-gradient(135deg, #ffc107, #e0a800)',
        buttonBg: 'linear-gradient(135deg, #ffc107, #e0a800)',
        accentColor: '#ffc107',
        icon: 'fas fa-microchip'
      };
    case 'microbiology':
      return {
        iconBg: 'linear-gradient(135deg, #17a2b8, #138496)',
        buttonBg: 'linear-gradient(135deg, #17a2b8, #138496)',
        accentColor: '#17a2b8',
        icon: 'fas fa-microscope'
      };
    case 'cybersecurity':
      return {
        iconBg: 'linear-gradient(135deg, #dc3545, #c82333)',
        buttonBg: 'linear-gradient(135deg, #dc3545, #c82333)',
        accentColor: '#dc3545',
        icon: 'fas fa-shield-alt'
      };
    case 'gamedev':
      return {
        iconBg: 'linear-gradient(135deg, #6f42c1, #5a2d91)',
        buttonBg: 'linear-gradient(135deg, #6f42c1, #5a2d91)',
        accentColor: '#6f42c1',
        icon: 'fas fa-code'
      };
    default:
      return {
        iconBg: 'linear-gradient(135deg, #007bff, #0056b3)',
        buttonBg: 'linear-gradient(135deg, #007bff, #0056b3)',
        accentColor: '#007bff',
        icon: 'fas fa-star'
      };
  }
};