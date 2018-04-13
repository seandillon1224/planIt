import React, { Component } from 'react';
import InfiniteCalendar, {
    Calendar,
    defaultMultipleDateInterpolation,
    withMultipleDates,
  } from 'react-infinite-calendar';
  import 'react-infinite-calendar/styles.css';
  
const MultipleDatesCalendar = withMultipleDates(Calendar);


class DatePicker extends Component {
    
	render(){
		return (
      <InfiniteCalendar 

      
            displayOptions={{
                layout: 'portrait',
                showOverlay: false,
                shouldHeaderAnimate: true,
              }}
    Component={MultipleDatesCalendar}
    /*
     * The `interpolateSelection` prop allows us to map the resulting state when a user selects a date.
     * By default, it adds the date to the selected dates array if it isn't already selected.
     * If the date is already selected, it removes it.
     *
     * You could re-implement this if this isn't the behavior you want.
     */

     
    width={585}
    height={500}
    interpolateSelection={defaultMultipleDateInterpolation}
    selected={[new Date()]}
  />
    
		)
  }
  
}


export default DatePicker;

