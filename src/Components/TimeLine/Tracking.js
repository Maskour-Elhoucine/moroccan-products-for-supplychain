import React, { Component } from "react";
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import Supplychain from "../../abis/Supplychain.json";
import PPBF from './PPBF';
import PFSBF from './PFSBF';
import PPBD from './PPBD';
import PSBF from './PSBF';
import PRBD from './PRBD';
import PPCSBD from './PPCSBD';
import PPCKBD from './PPCKBD';
import PFSBD from './PFSBD';
import PPCHBR from './PPCHBR';
import PSBD from './PSBD';
import PRBR from './PRBR';
import PFSBR from './PFSBR';
import PPCHBC from './PPCHBC';

class Tracking extends Component {
    constructor (props) {
        super(props);
        this.state = {
            upc: 0,
            item: '',
            stateX: '0'
        }
    }

    merge_objetcs(obj1, obj2) {
        var obj3 = {};
        for (var attrname1 in obj1) { obj3[attrname1] = obj1[attrname1]; }
        for (var attrname2 in obj2) { obj3[attrname2] = obj2[attrname2]; }
        return obj3;
    }

    async renderData (upc) {
        const web3 = window.web3
        const networkId = await web3.eth.net.getId();
        const networkData = Supplychain.networks[networkId];
        let item = [];
        if(networkData) {
            const supplychain = new web3.eth.Contract(Supplychain.abi, networkData.address);
            this.setState({ supplychain })

            const item1 = await supplychain.methods.getItemBufferOne(upc).call((err, result) => {
                if (err) console.log(err);
            })

            const item2 = await supplychain.methods.getItemBufferTwo(upc).call((err, result) => {
                if (err) console.log(err);
            })
            item = this.merge_objetcs(item1, item2);

            this.setState({
                item: item,
                stateX: item.itemState
            });
        }
    }

    render() {
        return (
            <div>
            <div className="row" style={{ alignItems: 'center', justifyContent: 'center', marginTop: '120px', marginLeft: '315px', marginRight: '65px' }}>
                <div className="col-xl-8 order-xl-1">
                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={(event) => {
                                event.preventDefault()
                                const upc = this.upc.value
                                this.setState({ upc: upc })
                                this.renderData(upc)
                            }}>
                                <h6 className="heading-small text-muted mb-4"> If you wanna track a product, just enter the universal code. </h6>
                                <div className="pl-lg-4">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="form-group">
                                                <label className="form-control-label" htmlFor="upc">Universal Product Code</label>
                                                <input type="number" id="upc" name="upc" className="form-control"
                                                       ref={(input) => { this.upc = input }} required />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-icon btn-primary" style={{ marginLeft: '390px' }} onClick={() => {
                                    var data = document.getElementById("timelineData");
                                    data.style.display = 'block';
                                }}> Tracking & Tracing </button>
                                <hr className="my-4"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row" style={{ alignItems: 'center', justifyContent: 'center', marginTop: '20px', marginLeft: '315px', marginRight: '65px', display: "none" }} id="timelineData">
                <div className="col-xl-12 order-xl-1">
                    <div className="card">
                        <div className="card-header">
                            <div className="row align-items-center">
                                <div className="col-8">
                                    <h3 className="mb-0">Product State For Now</h3>
                                </div>
                            </div>
                        </div>
                        <div className="card-body" style={{ backgroundColor: '#DFDDDF ' }}>
                            <VerticalTimeline>
                                {
                                    localStorage.hasOwnProperty('PPBF'+this.state.upc) ?
                                        <VerticalTimelineElement className="vertical-timeline-element--work"
                                             contentStyle={{ background: 'rgb(168, 84, 232)', color: '#292829' }}
                                             contentArrowStyle={{ borderRight: '7px solid  rgb(168, 84, 232)' }}
                                             date={ localStorage.getItem('PPBF'+this.state.upc) }
                                             iconStyle={{ background: 'rgb(168, 84, 232)' }}
                                             icon={ <PPBF /> }
                                        >
                                            <h4 className="vertical-timeline-element-subtitle text-white">{ localStorage.getItem('farmerID') }</h4>
                                            <p><i className="fa fa-info-circle" /> The Product Is Produced By Farmer </p>
                                        </VerticalTimelineElement> :
                                        <VerticalTimelineElement className="vertical-timeline-element--work"
                                             contentStyle={{ background: 'rgb(164, 156, 182 )', color: '#292829' }}
                                             contentArrowStyle={{ borderRight: '7px solid  rgb(164, 156, 182)' }}
                                             date="- - - - -"
                                             iconStyle={{ background: 'rgb(164, 156, 182 )' }}
                                             icon={ <PPBF /> }
                                        >
                                            <h4 className="vertical-timeline-element-subtitle text-white">- - - - -</h4>
                                            <p><i className="fa fa-info-circle" /> No Product With That Code </p>
                                        </VerticalTimelineElement>
                                }

                                {
                                    localStorage.hasOwnProperty('PFSBF'+this.state.upc) ?
                                    <VerticalTimelineElement className="vertical-timeline-element--work"
                                        contentStyle={{ background: 'rgb(164, 156, 182 )', color: '#292829' }}
                                        contentArrowStyle={{ borderRight: '7px solid  rgb(164, 156, 182)' }}
                                        date={ localStorage.getItem('PFSBF'+this.state.upc) }
                                        iconStyle={{ background: 'rgb(164, 156, 182 )' }}
                                        icon={ <PFSBF /> }
                                    >
                                        <h4 className="vertical-timeline-element-subtitle text-white">{ localStorage.getItem('farmerID') }</h4>
                                        <p><i className="fa fa-info-circle" /> The Product Is For Sale By Farmer </p>
                                    </VerticalTimelineElement> : <div></div>
                                }

                                {
                                    localStorage.hasOwnProperty('PPBD'+this.state.upc) ?
                                        <VerticalTimelineElement className="vertical-timeline-element--work"
                                             contentStyle={{ background: 'rgb(201, 122, 24)', color: '#292829' }}
                                             contentArrowStyle={{ borderRight: '7px solid  rgb(201, 122, 24)' }}
                                             date={ localStorage.getItem('PPBD'+this.state.upc) }
                                             iconStyle={{ background: 'rgb(201, 122, 24' }}
                                             icon={ <PPBD /> }
                                        >
                                            <h4 className="vertical-timeline-element-subtitle text-white">{ localStorage.getItem('distributorID') }</h4>
                                            <p><i className="fa fa-info-circle" /> The Product Is Purchased By Distributor </p>
                                        </VerticalTimelineElement> : <div></div>
                                }

                                {
                                    localStorage.hasOwnProperty('PSBF'+this.state.upc) ?
                                        <VerticalTimelineElement className="vertical-timeline-element--work"
                                             contentStyle={{ background: '#28BBF0', color: '#292829' }}
                                             contentArrowStyle={{ borderRight: '7px solid  #28BBF0' }}
                                             date={ localStorage.getItem('PSBF'+this.state.upc) }
                                             iconStyle={{ background: '#28BBF0' }}
                                             icon={ <PSBF /> }
                                        >
                                            <h4 className="vertical-timeline-element-subtitle text-white">{ localStorage.getItem('distributorID') }</h4>
                                            <p><i className="fa fa-info-circle" /> The Product Is Shipped By Farmer </p>
                                        </VerticalTimelineElement> : <div></div>
                                }


                                {
                                    localStorage.hasOwnProperty('PRBD'+this.state.upc) ?
                                        <VerticalTimelineElement className="vertical-timeline-element--work"
                                             contentStyle={{ background: '#B9C439', color: '#292829' }}
                                             contentArrowStyle={{ borderRight: '7px solid  #B9C439' }}
                                             date={ localStorage.getItem('PRBD'+this.state.upc) }
                                             iconStyle={{ background: '#B9C439' }}
                                             icon={ <PRBD /> }
                                        >
                                            <h4 className="vertical-timeline-element-subtitle text-white">{ localStorage.getItem('distributorID') }</h4>
                                            <p><i className="fa fa-info-circle" /> The Product Is Received By Distributor </p>
                                        </VerticalTimelineElement> : <div></div>
                                }

                                {
                                    localStorage.hasOwnProperty('PPCSBD'+this.state.upc) ?
                                        <VerticalTimelineElement className="vertical-timeline-element--work"
                                             contentStyle={{ background: '#A97F70', color: '#292829' }}
                                             contentArrowStyle={{ borderRight: '7px solid  #A97F70' }}
                                             date={ localStorage.getItem('PPCSBD'+this.state.upc) }
                                             iconStyle={{ background: '#A97F70' }}
                                             icon={ <PPCSBD /> }
                                        >
                                            <h4 className="vertical-timeline-element-subtitle text-white">{ localStorage.getItem('distributorID') }</h4>
                                            <p><i className="fa fa-info-circle" /> The Product Is Processed By Distributor </p>
                                        </VerticalTimelineElement> : <div></div>
                                }

                                {
                                    localStorage.hasOwnProperty('PPCKBD'+this.state.upc) ?
                                        <VerticalTimelineElement className="vertical-timeline-element--work"
                                             contentStyle={{ background: '#B75062', color: '#292829' }}
                                             contentArrowStyle={{ borderRight: '7px solid  #B75062' }}
                                             date={ localStorage.getItem('PPCKBD'+this.state.upc) }
                                             iconStyle={{ background: '#B75062' }}
                                             icon={ <PPCKBD /> }
                                        >
                                            <h4 className="vertical-timeline-element-subtitle text-white">{ localStorage.getItem('distributorID') }</h4>
                                            <p><i className="fa fa-info-circle" /> The Product Is Packaged By Distributor </p>
                                        </VerticalTimelineElement> : <div></div>
                                }

                                {
                                    localStorage.hasOwnProperty('PFSBD'+this.state.upc) ?
                                        <VerticalTimelineElement className="vertical-timeline-element--work"
                                             contentStyle={{ background: '#4780F2', color: '#292829' }}
                                             contentArrowStyle={{ borderRight: '7px solid  #4780F2' }}
                                             date={ localStorage.getItem('PFSBD'+this.state.upc) }
                                             iconStyle={{ background: '#4780F2' }}
                                             icon={ <PFSBD /> }
                                        >
                                            <h4 className="vertical-timeline-element-subtitle text-white">{ localStorage.getItem('distributorID') }</h4>
                                            <p><i className="fa fa-info-circle" /> The Product Is For Sell By Distributor </p>
                                        </VerticalTimelineElement> : <div></div>
                                }

                                {
                                    localStorage.hasOwnProperty('PPCHBR'+this.state.upc) ?
                                        <VerticalTimelineElement className="vertical-timeline-element--work"
                                             contentStyle={{ background: '#8C8C8C', color: '#292829' }}
                                             contentArrowStyle={{ borderRight: '7px solid  #8C8C8C' }}
                                             date={ localStorage.getItem('PPCHBR'+this.state.upc) }
                                             iconStyle={{ background: '#8C8C8C' }}
                                             icon={ <PPCHBR /> }
                                        >
                                            <h4 className="vertical-timeline-element-subtitle text-white">{ localStorage.getItem('retailerID') }</h4>
                                            <p><i className="fa fa-info-circle" /> The Product Is Purchased By Retailer </p>
                                        </VerticalTimelineElement> : <div></div>
                                }

                                {
                                    localStorage.hasOwnProperty('PSBD'+this.state.upc) ?
                                        <VerticalTimelineElement className="vertical-timeline-element--work"
                                             contentStyle={{ background: '#C03434', color: '#292829' }}
                                             contentArrowStyle={{ borderRight: '7px solid  #C03434' }}
                                             date={ localStorage.getItem('PSBD'+this.state.upc) }
                                             iconStyle={{ background: '#C03434' }}
                                             icon={ <PSBD /> }
                                        >
                                            <h4 className="vertical-timeline-element-subtitle text-white">{ localStorage.getItem('retailerID') }</h4>
                                            <p><i className="fa fa-info-circle" /> The Product Is Shipped By Distributor </p>
                                        </VerticalTimelineElement> : <div></div>
                                }

                                {
                                    localStorage.hasOwnProperty('PRBR'+this.state.upc) ?
                                        <VerticalTimelineElement className="vertical-timeline-element--work"
                                             contentStyle={{ background: 'rgb(255, 153, 204)', color: '#292829' }}
                                             contentArrowStyle={{ borderRight: '7px solid  rgb(255, 153, 204)' }}
                                             date={ localStorage.getItem('PRBR'+this.state.upc) }
                                             iconStyle={{ background: 'rgb(255, 153, 204)' }}
                                             icon={ <PRBR /> }
                                        >
                                            <h4 className="vertical-timeline-element-subtitle text-white">{ localStorage.getItem('retailerID') }</h4>
                                            <p><i className="fa fa-info-circle" /> The Product Is Received By Retailer </p>
                                        </VerticalTimelineElement> : <div></div>
                                }

                                {
                                    localStorage.hasOwnProperty('PFSBR'+this.state.upc) ?
                                        <VerticalTimelineElement className="vertical-timeline-element--work"
                                             contentStyle={{ background: 'rgb(138, 138, 92)', color: '#292829' }}
                                             contentArrowStyle={{ borderRight: '7px solid  rgb(138, 138, 92)' }}
                                             date={ localStorage.getItem('PFSBR'+this.state.upc) }
                                             iconStyle={{ background: 'rgb(138, 138, 92)' }}
                                             icon={ <PFSBR /> }
                                        >
                                            <h4 className="vertical-timeline-element-subtitle text-white">{ localStorage.getItem('retailerID') }</h4>
                                            <p><i className="fa fa-info-circle" /> The Product Is For Sell By Retailer </p>
                                        </VerticalTimelineElement> : <div></div>
                                }

                                {
                                    localStorage.hasOwnProperty('PPCHBC'+this.state.upc) ?
                                        <VerticalTimelineElement className="vertical-timeline-element--work"
                                             contentStyle={{ background: 'rgb(51, 153, 51)', color: '#292829' }}
                                             contentArrowStyle={{ borderRight: '7px solid  rgb(51, 153, 51)' }}
                                             date={ localStorage.getItem('PPCHBC'+this.state.upc) }
                                             iconStyle={{ background: 'rgb(51, 153, 51)' }}
                                             icon={ <PPCHBC /> }
                                        >
                                            <h4 className="vertical-timeline-element-subtitle text-white">{ localStorage.getItem('consumerID') }</h4>
                                            <p><i className="fa fa-info-circle" /> The Product Is Purchsed By Consumer </p>
                                        </VerticalTimelineElement>  : <div></div>
                                }
                            </VerticalTimeline>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        );
    }
}

export default Tracking;
