$(document).ready(
        function() {
            var Content = React.createClass({
                render: function () {
                    return <p > content < /p>;
                }
            })
            var Comment = React.createClass({
                getInitialState: function () {
                    return {
                        names: ['Tim', 'John', 'Hank']
                    };
                },
                render: function () {
                    var options = [];
                    for (var option in this.state.names) {
                        options.push( < option value = {
                                option
                            } > {
                                this.state.names[option]
                            } < /option>)
                        };
                        return <div >
                            < select > {
                                options
                            } < /select> < Content > < /Content> < /div>;
                    }
                }); ReactDOM.render( < Comment > < /Comment>, $('#container')[0]);
            })
