import React, { Component } from "react";

class TXHistory extends Component {
    constructor () {
        super();
    }

    allStorage() {
        var archive = [],
        keys = Object.keys(localStorage),
        i = 0, key;
        for (; key = keys[i]; i++) {
            if (key.includes('ID'))
            archive.push( key + '=' + localStorage.getItem(key));
        }
        return archive;
    }

    render() {
        const transx = this.allStorage();
        return (
            <div className="row" style={{ alignItems: 'center', justifyContent: 'center', marginTop: '120px', marginLeft: '315px', marginRight: '65px' }}>
                <div className="col-xl-8 order-xl-1">
                    <div className="card">
                        <div className="card-header">
                            <div className="row align-items-center">
                                <div className="col-8">
                                    <h3 className="mb-0">Transactions History</h3>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table">
                                    <tbody>
                                        <tr>
                                            <th> TX PPBF </th>
                                            <td> { localStorage.getItem('transaction(15)') } </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TXHistory;
