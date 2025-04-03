import { Image, StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

interface CardProps {
  title: string;
  description: string;
  imageUrl?: string;
}

export function BaseCard({ title, description, imageUrl }: CardProps) {
  return (
    <ThemedView className="rounded-lg !bg-background-900 p-4 shadow-md">
      <ThemedView className='flex-col !bg-background-900 gap-2'>
        <ThemedText className='text-lg font-bold'>{title}</ThemedText>
        <ThemedText className='text-sm text-gray-600' numberOfLines={2}>
          {description}
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});