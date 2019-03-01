import React, { Component } from 'react';
import Button from '../components/Button';
import { Redirect } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Label from '../components/Label';
import StudentGPListHandler from '../handlers/StudentGPListHandler';
import InvitesModal from '../components/InvitesModal';
import PurchaseModal from '../components/PurchaseModal';
import GiftsModal from '../components/GiftsModal';

class StudentInfo extends Component {
    state = { invitesModal:false, giftsModal:false, purchasesModal:false, gifts:[], purchases:[]}     

    constructor(props){
        super(props);
        this.student = Dashboard.selectedStudent;
    }

    componentDidMount(){

        if(this.student.code != undefined){

            StudentGPListHandler({code:this.student.code}, 
                (res)=>{

                    let newState = Object.assign({}, this.state);
                    newState.gifts = res.gifts;
                    newState.purchases = res.purchases;

                    console.log(res.gifts);
                    
                    
                    this.setState(newState);

                },(err)=>{

                    alert(err)
                })
        }
    }

    render() { 

        if(this.student.code === undefined){

            return(
                <Redirect to="/admin" />
            );
        }else{

        return ( 
            
            <div style={{opacity:0.85,
                display:'flex',
                height:(this.props.height*(0.78)),
                minHeight:440,
                width:(this.props.width*(0.86)),
                minWidth:900,
                flexDirection:'column',
                alignItems:'center',
                justifyContent:'space-around',
                borderRadius:15,
                backgroundColor:'rgb(55, 110, 198)'}}>

                <div style={s.space}/>
                
                <div style={s.sec1}>
                    <div style={s.row}>
                        <div style={s.column}>
                            <Label text={this.student.lastName} label="نام خانوادگی"/>
                        </div>
                        <div style={s.column}>
                            <Label text={this.student.firstName} label="نام "/>
                        </div>
                        <div style={s.column}>
                            <Label text={this.student.code} label="کد خانواده"/>
                        </div>
                    </div>
                    <div style={s.row}>
                        <div style={s.column}>
                            <Label text={this.student.school} label="مدرسه"/>
                        </div>
                        <div style={s.column}>
                            <Label text={this.student.phone} label="شماره تماس"/>
                        </div>
                        <div style={s.column}>
                            <Label text={this.student.phone} label="شماره منزل"/>
                        </div>
                    </div>
                    <div style={s.row}>
                        <div style={s.column2}>
                            <Label text={this.student.gift} label="هدیه"/>
                        </div>
                        <div style={s.column2}>
                            <Label text={this.student.credit} label="اعتبار"/>
                        </div>
                        <div style={s.column2}>
                            <Label text={this.student.grade} label="پایه"/>
                        </div>
                        <div style={s.column2}>
                            <Label text={this.student.field} label="رشته"/>
                        </div>
                    </div>  
                </div>
                <div style={s.sec2}>
                    <div style={s.btn_sec}>
                        <Button height="65%" width="70%" onClick={this.invitesModalOpen}>لیست دعوت ها</Button>
                    </div>
                    <div style={s.btn_sec}>
                        <Button height="65%" width="70%" onClick={this.giftsModalOpen} 
                        list={this.state.gifts}>لیست هدایا</Button>
                    </div>
                    <div style={s.btn_sec}>
                        <Button height="65%" width="70%" onClick={this.purchasesModalOpen} 
                        list={this.state.purchases}>لیست خریدها</Button>
                    </div>
                </div>

                <div style={s.space}/>

                <InvitesModal open={this.state.invitesModal} onClose={this.invitesModalClose}/>
                <GiftsModal open={this.state.giftsModal} onClose={this.giftsModalClose} list={this.state.gifts}/>
                <PurchaseModal open={this.state.purchasesModal} onClose={this.purchasesModalClose} list={this.state.purchases}/>
            </div>
        );
        }
    }

    invitesModalOpen = ()=>{

        let newState = Object.assign({}, this.state);
        newState.invitesModal = true;
        this.setState(newState);
    }

    invitesModalClose = ()=>{

        let newState = Object.assign({}, this.state);
        newState.invitesModal = false;
        this.setState(newState);
    }

    giftsModalOpen = ()=>{

        let newState = Object.assign({}, this.state);
        newState.giftsModal = true;
        this.setState(newState);
    }

    giftsModalClose = ()=>{

        let newState = Object.assign({}, this.state);
        newState.giftsModal = false;
        this.setState(newState);
    }

    purchasesModalOpen = ()=>{

        let newState = Object.assign({}, this.state);
        newState.purchasesModal = true;
        this.setState(newState);
    }

    purchasesModalClose = ()=>{

        let newState = Object.assign({}, this.state);
        newState.purchasesModal = false;
        this.setState(newState);
    }
}

const s = {

    container:{
        opacity:0.88,
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'space-around',
        height:480,
        width:1100,
        borderRadius:15,
        backgroundColor:'rgb(55, 110, 198)',
    },

    sec1:{
        height:'45%',
        width:'90%',
        display:'flex',
        justifyContent:'space-between',
        flexDirection:'column'
    },

    sec2:{
        display:'flex',
        height:'20%',
        justifyContent:'space-between',
        width:'90%',
    },

    btn_sec:{

        height:'100%',
        width:'32.5%',
    },

    row:{
        display:'flex',
        justifyContent:'space-between',
        height:'31.5%',
        width:'100%',
    },

    column:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        height:'100%',
        width:'32.9%',
        borderRadius:8,
        borderStyle:'solid',
        borderWidth:1,
        borderColor:'rgba(255,255,255,0.15)'
    },

    column2:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        height:'100%',
        width:'24.55%',
        borderRadius:8,
        borderStyle:'solid',
        borderWidth:1,
        borderColor:'rgba(255,255,255,0.15)'
    },

    space:{
        height:'5%',
    }
}
 
export default StudentInfo;