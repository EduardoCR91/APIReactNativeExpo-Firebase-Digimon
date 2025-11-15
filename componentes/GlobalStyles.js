import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#030712',
  },
  pageContent: {
    flex: 1,
    padding: 10,
  },
  // --- Auth ---
  authContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#1F2937',
  },
  formContainer: { // Añadido para TeamsPage
    padding: 10,
    backgroundColor: '#1F2937',
    borderRadius: 8,
  },
  formTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 24,
  },
  formError: {
    color: '#DC2626',
    textAlign: 'center',
    marginBottom: 16,
  },
  formInput: {
    backgroundColor: '#111827',
    color: '#FFF',
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 16,
  },
  formLabel: {
    fontSize: 16,
    color: '#FFF',
    marginBottom: 8,
  },
  authSwitchText: {
    color: '#9CA3AF',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
  // --- Botones ---
  button: {
    backgroundColor: '#374151',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1, // Para que ocupen espacio en 'cardActions'
  },
  buttonCyan: {
    backgroundColor: '#06B6D4',
  },
  buttonRed: {
    backgroundColor: '#DC2626',
  },
  buttonDisabled: {
    backgroundColor: '#374151',
    opacity: 0.5,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 14,
  },
  // --- Tarjetas ---
  card: {
    flex: 1,
    margin: 5,
    backgroundColor: '#1F2937',
    borderRadius: 8,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 150,
  },
  cardContent: {
    padding: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
  cardLevel: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 10,
  },
  cardActions: {
    flexDirection: 'row',
    gap: 10,
  },
  // --- Paginación ---
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginTop: 10,
  },
  paginationText: {
    color: '#FFF',
    fontSize: 16,
  },
  // --- Detalles ---
  detailsContainer: {
    padding: 10,
  },
  detailsImage: {
    width: '100%',
    height: 300,
    marginBottom: 20,
  },
  detailsTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
  },
  detailsLevel: {
    fontSize: 20,
    color: '#06B6D4',
    textAlign: 'center',
    marginBottom: 20,
  },
  detailsDescription: {
    fontSize: 16,
    color: '#9CA3AF',
    lineHeight: 24,
  },
  // --- Búsqueda ---
  searchInput: {
    backgroundColor: '#1F2937',
    color: '#FFF',
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 20,
  },
  infoText: {
    color: '#9CA3AF',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  errorText: {
    color: '#DC2626',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  // --- Info ---
  infoBox: {
    backgroundColor: '#1F2937',
    borderRadius: 8,
    padding: 20,
  },
  infoTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 10,
  },
  infoTextContent: {
    fontSize: 16,
    color: '#9CA3AF',
    lineHeight: 24,
    marginBottom: 15,
  },
  // --- Equipos (Original) ---
  teamSelectionList: {
    marginVertical: 10,
  },
  teamSelectionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#374151',
    padding: 10,
    borderRadius: 6,
    marginBottom: 5,
  },
  teamSelectionItemActive: {
    backgroundColor: '#0E7490',
  },
  teamSelectionImg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  teamSelectionName: {
    color: '#FFF',
    fontSize: 16,
  },
  teamsListContainer: {
    marginTop: 30,
  },
  teamCard: {
    backgroundColor: '#1F2937',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  teamCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  teamCardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#06B6D4',
  },
  teamCardMembers: {
    flexDirection: 'row',
    gap: 10,
  },
  teamCardMember: {
    alignItems: 'center',
  },
  teamCardMemberImg: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  teamCardMemberName: {
    color: '#9CA3AF',
    fontSize: 12,
    marginTop: 5,
  },
});
