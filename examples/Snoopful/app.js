import React, { Component } from 'react';
import { StyleSheet, Text, View, ListView } from 'react-native';

import Snoopy from 'rn-snoopy';
import { stringify } from 'rn-snoopy/formatting';
import bars from 'rn-snoopy/stream/bars';
import filter from 'rn-snoopy/stream/filter';
import buffer from 'rn-snoopy/stream/buffer';

import EventEmitter from 'react-native/Libraries/vendor/emitter/EventEmitter';
const emitter = new EventEmitter();

const events = Snoopy.stream(emitter);

filter(info => info.method == 'createView', true)(events).subscribe();
/*
// show create views
//
filter((info)=> info.method == 'createView', true)(events).subscribe()
*/

//draw a live graph of events
//
//bars(info => info.length)(buffer()(events)).subscribe();

// deep filter on args
//
//filter({ method: 'asd', arg: { foo: { BAR: 1 } } }, true)(events).subscribe();

// use a threshold
//
//bars(infoAry => infoAry.length, 100, true)(buffer()(events)).subscribe();

/*
// slowmo - force communication to happen slowly by busylooping. don't
// try this other than experiments.
filter(info => {
  let i = 10000000;
  while (i--) {}
  return info.method == 'createView';
}, true)(events).subscribe();
*/

import R from 'ramda';
const data = R.range(1, 1000);

class Snoopful extends Component {
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows(data),
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          style={{ flex: 1 }}
          containerStyle={styles.container}
          dataSource={this.state.dataSource}
          renderRow={rowData => (
            <View style={styles.row}>
              <Text>User {rowData}</Text>
            </View>
          )}
          pageSize={100}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Snoopful;
