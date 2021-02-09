import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Button,
  TouchableOpacity,
  FlatList,
  Image,
  SafeAreaView,
  ActivityIndicator,
  RefreshControl,
  Dimensions,
} from "react-native";
import Swiper from "react-native-swiper";
import { Title, Paragraph, useTheme, Text } from "react-native-paper";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { ScrollView } from "react-native-gesture-handler";

const movieUrl = "https://reactnative.dev/movies.json";

export default function Home({ navigation }) {
  const { color } = useTheme();
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    searchRandomUser();
    onRefresh();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    searchRandomUser();
  };

  const searchRandomUser = async () => {
    await fetch(movieUrl)
      .then((response) => response.json())
      .then((jsonResponse) => {
        setRefreshing(false), setData(jsonResponse.movies);
      })
      .catch((error) => alert(error));
  };
  return (
    <SafeAreaView style={{ backgroundColor: color.surface }}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => onRefresh()}
          />
        }
      >
        {refreshing ? (
          <View style={{ flex: 1, width: "100%" }}>
            <SkeletonPlaceholder
              backgroundColor={color.refresh}
              highlightColor={color.refresh2}
              speed={1300}
            >
              <View style={styles.sliderContener}></View>
              <ScrollView
                style={{ flexDirection: "row", marginTop: 55, marginLeft: 10 }}
                horizontal={true}
              >
                <View style={styles.card}></View>
                <View style={styles.card}></View>
                <View style={styles.card}></View>
                <View style={styles.card}></View>
                <View style={styles.card}></View>
              </ScrollView>
            </SkeletonPlaceholder>
          </View>
        ) : (
          <View>
            <View style={[styles.sliderContener, styles.shadow]}>
              <Swiper
                autoplay
                horizontal={false}
                activeDotColor=""
                autoplayTimeout={5}
              >
                <View style={styles.slide}>
                  <Image
                    source={{
                      uri:"https://source.unsplash.com/random/1920x1080?sig=" + Math.random() * (1000 - 1) + 1,
                    }}
                    style={styles.sliderImage}
                  />
                  
                </View>
                <View style={styles.slide}>
                  <Image
                    source={{
                      uri:"https://source.unsplash.com/random/1920x1080?sig=" + Math.random() * (1000 - 1) + 1,
                    }}
                    style={styles.sliderImage}
                  />
                </View>
                <View style={styles.slide}>
                  <Image
                    source={{
                      uri:"https://source.unsplash.com/random/1920x1080?sig=" + Math.random() * (1000 - 1) + 1,
                    }}
                    style={styles.sliderImage}
                  />
                </View>
              </Swiper>
            </View>
            <Text
              style={{
                fontSize: "bold",
                alignSelf: "center",
                fontSize: 24,
                marginVertical: 10,
              }}
            >
              Reviews
            </Text>
            <FlatList
              horizontal
              style={{ paddingHorizontal: 10 }}
              pagingEnabled={true}
              showsHorizontalScrollIndicator={false}
              legacyImplementation={false}
              data={data}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{ marginVertical: 5 }}
                  onPress={() => navigation.navigate("Reviews", item)}
                >
                  <View style={[styles.card, styles.shadow]}>
                    <Image
                      source={{
                        uri:
                          "https://source.unsplash.com/random/600x600?sig=" + Math.random() * (1000 - 1) + 1,
                      }}
                      style={{
                        height: "100%",
                        width: "100%",
                        borderRadius: 8,
                      }}
                    />
                    <Title>{item.title}</Title>
                    <Paragraph>Card content</Paragraph>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sliderContener: {
    height: 200,
    width: "90%",
    marginVertical: 10,
    borderRadius: 8,
    alignSelf: "center",
  },
  sliderImage: {
    height: "100%",
    width: "100%",
    borderRadius: 8,
  },
  slide: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
  },
  card: {
    marginLeft: 10,
    width: 150,
    height: 150,
    borderRadius: 8,
  },
  shadow: {
    backgroundColor: "#111",
    shadowColor: "#111",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 3,
  },
});
