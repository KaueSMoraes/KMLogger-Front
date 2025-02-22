import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '', 
    renderMode: RenderMode.Prerender 
  },
  {
    path: 'login', 
    renderMode: RenderMode.Prerender 
  },
  {
    path: 'forgot-password', 
    renderMode: RenderMode.Prerender 
  },
  {
    path: 'sign-up', 
    renderMode: RenderMode.Prerender 
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender 
  }
];
