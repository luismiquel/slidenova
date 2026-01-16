import { supabase } from './supabaseClient';
import { Presentation } from '../types';

export async function getPresentationsForUser(): Promise<Presentation[]> {
  const { data, error } = await supabase
    .from('presentations')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as Presentation[];
}

export async function savePresentation(presentation: Presentation) {
  const { error } = await supabase
    .from('presentations')
    .insert({
      id: presentation.id,
      user_id: (await supabase.auth.getUser()).data.user?.id,
      title: presentation.mainTitle,
      slides: presentation.slides,
      created_at: presentation.createdAt
    })
    .select();

  if (error) throw error;
}

export async function deletePresentation(id: string) {
  const { error } = await supabase
    .from('presentations')
    .delete()
    .eq('id', id);

  if (error) throw error;
}
