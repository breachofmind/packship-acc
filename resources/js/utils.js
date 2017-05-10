import {connect} from 'react-redux'

export default {
    mapProps: function(object,opts={})
    {
        let state = opts.state || undefined;
        let dispatch = opts.dispatch || undefined;

        return connect(state,dispatch)(object);
    }
}