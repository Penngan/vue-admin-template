import service from '@/utils/request'

export function getPermissionRoutes() {
  return service.get('/api/permission_routes')
}
