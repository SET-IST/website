'use client';

import { EdgeStoreRouter } from '@/pages/api/edgestore/[...edgestore]';
import { createEdgeStoreProvider } from '@edgestore/react';


const { EdgeStoreProvider, useEdgeStore } =
  createEdgeStoreProvider<EdgeStoreRouter>();

export { EdgeStoreProvider, useEdgeStore };