import useLoginStore from '@/store/login';
export default function usePermission(permissionId: string) {
  const loginStore = useLoginStore();
  const { permissions } = loginStore;
  return !!permissions.find((item) => item.includes(permissionId));
}
