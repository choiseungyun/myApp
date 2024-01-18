import dayjs from 'dayjs';
import {Alert, Dimensions, FlatList, Image, ImageBackground, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';

import React, {useEffect, useState} from 'react';
import {getCalendarColumns} from '../utils/calendarUtil';
import {Button, IconButton, MD2Colors} from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const {width, height} = Dimensions.get('window');

function Calendar() {
  const today = new Date();
  const now = dayjs(today);
  const [selectYYYYMM, setSelectYYYYMM] = useState(dayjs(now));
  const [dayList, setDayList] = useState(getCalendarColumns(now));
  const [startDate, setStartDate] = useState(new Date());
  const [startOpen, setStartOpen] = useState(false);
  const [endDate, setEndDate] = useState(new Date());
  const [endOpen, setEndOpen] = useState(false);
  const [resultCount, setResultCount] = useState(0);

  const rednerItem = ({item: date}: any) => {
    const dateText = dayjs(date).get('date');
    const weekOfDay = dayjs(date).get('day'); //요일 가져오기
    const dayColor = weekOfDay === 0 ? MD2Colors.red400 : weekOfDay === 6 ? MD2Colors.blue300 : MD2Colors.black;
    const dayOpacity = dayjs(date).isSame(now, 'month') ? 1 : 0.4;
    const todayColor = dayjs(date).isSame(now, 'date') ? MD2Colors.yellow500 : 'transparent';
    const today = dayjs(date).isSame(now, 'date') ? 50 : 0;
    return (
      <View style={{flex: 1, backgroundColor: todayColor, borderRadius: today}}>
        <TouchableOpacity
          style={{
            width: width / 7 - 3,
            height: ((height / 3.3) * 2) / Number(Platform.select({ios: 8.5, android: 8})), //전체 높이에서 2/3만큼의 영역에서  높이를 구함.
            //justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 0.5,
            borderColor: MD2Colors.black,
          }}
          onPress={() => null}>
          <Text
            style={{
              color: dayColor,
              textAlign: 'right',
              opacity: dayOpacity,
              verticalAlign: 'top',
            }}>
            {dateText}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const onPressArrow = (dir: string) => {
    //Alert.alert(dayjs(selectYYYYMM).get('month').toString());
    if (dir === 'R') {
      setDayList(getCalendarColumns(dayjs(selectYYYYMM).add(1, 'month')));
      setSelectYYYYMM(dayjs(selectYYYYMM).add(1, 'month'));
    } else if (dir === 'L') {
      setDayList(getCalendarColumns(dayjs(selectYYYYMM).subtract(1, 'month')));

      setSelectYYYYMM(dayjs(selectYYYYMM).subtract(1, 'month'));
    }
  };

  useEffect(() => {
    // console.log(startDate);
    // console.log(endDate);

    setResultCount(dayjs(endDate).diff(startDate, 'day'));
    //Alert.alert(selectYYYYMM);
  }, [startDate, endDate]);

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <ImageBackground source={require('../images/white_paper.jpg')} resizeMode="stretch" style={{flex: 1, justifyContent: 'center'}}>
          <View
            style={{
              flex: 2,
              width: '100%',
              alignItems: 'center',
              alignContent: 'center',
            }}>
            <View
              style={{
                //justifyContent: 'center',
                alignItems: 'center',
                paddingLeft: 10,
                paddingRight: 10,
              }}>
              <View style={{flexDirection: 'row', backgroundColor: 'transparent'}}>
                <IconButton icon="arrow-left" onPress={() => onPressArrow('L')} />
                <TouchableOpacity onPress={() => null}>
                  <Text style={{fontSize: 40, justifyContent: 'center'}}>
                    {dayjs(selectYYYYMM).get('year')}년 {dayjs(selectYYYYMM).get('month') + 1}월
                  </Text>
                </TouchableOpacity>
                <IconButton icon="arrow-right" onPress={() => onPressArrow('R')} />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  padding: 10,
                }}>
                <View style={[styles.weekOfDayTextView]}>
                  <Text style={[{color: MD2Colors.red400, fontSize: 15, fontWeight: 'bold'}]}>일</Text>
                </View>
                <View style={[styles.weekOfDayTextView]}>
                  <Text style={[{color: MD2Colors.black}, styles.weekOfDayTextViewString]}>월</Text>
                </View>
                <View style={[styles.weekOfDayTextView]}>
                  <Text style={[{color: MD2Colors.black}, styles.weekOfDayTextViewString]}>화</Text>
                </View>
                <View style={[styles.weekOfDayTextView]}>
                  <Text style={[{color: MD2Colors.black}, styles.weekOfDayTextViewString]}>수</Text>
                </View>
                <View style={[styles.weekOfDayTextView]}>
                  <Text style={[{color: MD2Colors.black}, styles.weekOfDayTextViewString]}>목</Text>
                </View>
                <View style={[styles.weekOfDayTextView]}>
                  <Text style={[{color: MD2Colors.black}, styles.weekOfDayTextViewString]}>금</Text>
                </View>
                <View style={[styles.weekOfDayTextView]}>
                  <Text style={[{color: MD2Colors.blue400}, styles.weekOfDayTextViewString]}>토</Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  //justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <FlatList data={dayList} numColumns={7} keyExtractor={index => `col-${index}`} renderItem={rednerItem} />
              </View>
            </View>
          </View>

          <View
            style={{
              flex: 1,
              alignItems: 'center',
            }}>
            <Text style={[styles.titleString]}>D-Day 계산기</Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={[styles.label]}>시작일 : </Text>
              <TextInput style={styles.input} onChangeText={() => null} onPressIn={() => setStartOpen(true)} readOnly={true} value={dayjs(startDate).format('YYYY년 MM월 DD일')} />
              <IconButton icon="calendar" size={35} onPress={() => setStartOpen(true)} />
            </View>
            <View style={{flexDirection: 'row', marginBottom: 20}}>
              <Text style={[styles.label]}>종료일 : </Text>
              <TextInput style={styles.input} onChangeText={() => null} onPressIn={() => setEndOpen(true)} readOnly={true} value={dayjs(endDate).format('YYYY년 MM월 DD일')} />
              <TouchableOpacity style={styles.button} onPress={() => setEndOpen(true)}>
                <Image source={require('../images/calendar.png')} style={{width: 35, height: 35, backgroundColor: 'transparent'}} />
              </TouchableOpacity>
            </View>
            <DatePicker
              modal
              mode="date"
              locale="ko-KR"
              open={startOpen}
              date={startDate}
              maximumDate={endDate}
              onConfirm={date => {
                setStartOpen(false);
                setStartDate(date);
              }}
              onCancel={() => {
                setStartOpen(false);
              }}
            />
            <DatePicker
              modal
              mode="date"
              locale="ko-KR"
              minimumDate={startDate}
              open={endOpen}
              date={endDate}
              onConfirm={date => {
                setEndOpen(false);
                setEndDate(date);
              }}
              onCancel={() => {
                setEndOpen(false);
              }}
            />
            <Text style={[styles.titleString]}>앞으로 {resultCount}일 남았습니다.</Text>
          </View>
        </ImageBackground>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  weekOfDayTextView: {
    width: width / 7 - 3,
    height: 30,
    //justifyContent: 'center',
    alignItems: 'center',
  },
  weekOfDayTextViewString: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  titleString: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    marginTop: 12,
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
    width: 150,
  },
  label: {
    height: 40,
    margin: 12,
    backgroundColor: MD2Colors.blueGrey100,
    padding: 10,
  },
  button: {
    height: 40,
    padding: 10,
  },
});

export default Calendar;
