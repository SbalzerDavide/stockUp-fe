import { View, Text, Image, StyleSheet } from 'react-native';

interface CardProps {
  title: string;
  description: string;
  imageUrl?: string;
}

export function ItemCard({ title, description, imageUrl }: CardProps) {
  return (
    <View className="bg-white rounded-lg p-4 shadow-md">
      <View className='flex-row items-center'>
        <View className='flex-1'>
          <Text className='text-lg font-bold'>{title}</Text>
          <Text className='text-sm text-gray-600' numberOfLines={2}>
            {description}
          </Text>
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: imageUrl || 'https://via.placeholder.com/50' }}
            style={styles.image}
          />
        </View>
      </View>
    </View>
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