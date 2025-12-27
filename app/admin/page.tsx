"use client"
import React, { useState, ReactNode } from "react";


type AppointmentStatus = "رزرو شده" | "انجام شده" | "کنسل شده";


interface ModalProps {
    children: ReactNode;
    onClose?: () => void;
    title?: string;
}

type Appointment = {
    id: number;
    time: string;
    customer: string;
    service: string;
    barberId: number | null;
    status: AppointmentStatus;
};


type Barber = {
    id: number | null;
    name: string;
    phone: string;
    schedule: string;
    specialties: string[];
};


type Service = {
    id: number | null;
    name: string;
    duration: number;
    price: number;
};


// Form props types
type ServiceFormProps = {
    initial: Service | null;
    onCancel: () => void;
    onSave: (s: Service) => void;
};


type BarberFormProps = {
    initial: Barber | null;
    onCancel: () => void;
    onSave: (b: Barber) => void;
}

export default function DashboardPage() {
    // Mock data
    const [appointments, setAppointments] = useState<Appointment[]>([
        { id: 1, time: "09:00", customer: "مینا حسینی", service: "کوتاهی", barberId: 1, status: "رزرو شده" },
        { id: 2, time: "10:30", customer: "زهرا رضایی", service: "رنگ", barberId: 2, status: "رزرو شده" },
        { id: 3, time: "13:00", customer: "سارا مرادی", service: "شینیون", barberId: 1, status: "انجام شده" },
    ])

    const [barbers, setBarbers] = useState<Barber[]>([
        { id: 1, name: "نفس صادقی", phone: "0901xxxxxxx", schedule: "Tue-Fri 09:00-17:00", specialties: ["کوتاهی", "شینیون"] },
        { id: 2, name: "پگاه کریمی", phone: "0912xxxxxxx", schedule: "Mon-Wed 11:00-19:00", specialties: ["رنگ", "ترمیم"] },
    ])

    const [services, setServices] = useState<Service[]>([
        { id: 1, name: "کوتاهی ", duration: 30, price: 300000 },
        { id: 2, name: "رنگ پایه", duration: 90, price: 1200000 },
        { id: 3, name: "شینیون", duration: 60, price: 700000 },
    ])

    // UI state
    const [selectedDate] = useState<Date>(new Date())
    const [showServiceModal, setShowServiceModal] = useState(false)
    const [editingService, setEditingService] = useState<Service | null>(null)
    const [showBarberModal, setShowBarberModal] = useState(false)
    const [editingBarber, setEditingBarber] = useState<Barber | null>(null)

    // Appointment handlers
    function changeAppointmentTime(id: number, newTime: string) {
        setAppointments(prev => prev.map(a => a.id === id ? { ...a, time: newTime } : a))
    }

    function cancelAppointment(id: number) {
        setAppointments(prev => prev.filter(a => a.id !== id))
    }

    // Services handlers
    function openAddService() {
        setEditingService({ id: 0, name: "", duration: 30, price: 0 })
        setShowServiceModal(true)
    }
    function openEditService(s: Service) {
        setEditingService(s)
        setShowServiceModal(true)
    }
    function saveService(service: Service) {
        if (!service.name) return
        if (service.id == null) {
            const nextId = Math.max(0, ...services.map(s => s.id ?? 0)) + 1
            setServices(prev => [...prev, { ...service, id: nextId }])
        } else {
            setServices(prev => prev.map(s => s.id === service.id ? service : s))
        }
        setShowServiceModal(false)
        setEditingService(null)
    }
    function deleteService(id: number|null) {
        setServices(prev => prev.filter(s => s.id !== id))
    }

    // Barbers handlers
    function openAddBarber() {
        setEditingBarber({ id: 0, name: "", phone: "", schedule: "", specialties: [] })
        setShowBarberModal(true)
    }
    function openEditBarber(b: Barber) {
        setEditingBarber({ ...b })
        setShowBarberModal(true)
    }
    function saveBarber(barber: Barber) {
        if (!barber.name) return
        if (barber.id == null) {
            const nextId = Math.max(0, ...barbers.map(b => b.id ?? 0)) + 1
            setBarbers(prev => [...prev, { ...barber, id: nextId }])
        } else {
            setBarbers(prev => prev.map(b => b.id === barber.id ? barber : b))
        }
        setShowBarberModal(false)
        setEditingBarber(null)
    }
    function deleteBarber(id: number | null) {
        setBarbers(prev => prev.filter(b => b.id !== id))
        // also orphan appointments assigned to that barber (simple behavior)
        setAppointments(prev => prev.map(a => a.barberId === id ? { ...a, barberId: null } : a))
    }

    // small helpers
    const todaysCount = appointments.filter(a => a.status !== "کنسل شده").length
    function getBarberName(id: number | null): string {
        const b = barbers.find(x => x.id === id)
        return b ? b.name : "-"
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                <header className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold">داشبورد آرایشگاه</h1>
                    <div className="text-sm text-gray-600">{selectedDate.toLocaleDateString('fa-IR')}</div>
                </header>

                {/* Overview */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
                    <Card >
                        <div>
                            <div className="text-sm text-gray-500">تعداد نوبت امروز</div>
                            <div className="mt-2 text-3xl font-semibold">{todaysCount}</div>
                        </div>
                    </Card>

                    <Card  >
                        <div>
                            <div className="flex justify-between items-center">
                                <div>
                                    <div className="text-sm text-gray-500">آرایشگرها</div>
                                    <div className="mt-2 text-lg font-medium">{barbers.length}</div>
                                </div>
                                <div>
                                    <button onClick={openAddBarber} className="px-3 cursor-pointer py-1 bg-pink-600 text-white rounded text-sm">ثبت آرایشگر</button>
                                </div>
                            </div>
                        </div>
                    </Card>

                    <div className="lg:col-span-2">
                        <Card title="لیست نوبت‌ها" >
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="text-right">
                                        <th>ساعت</th>
                                        <th>مشتری</th>
                                        <th>خدمت</th>
                                        <th>آرایشگر</th>
                                        <th>وضعیت</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {appointments.map(a => (
                                        <tr key={a.id} className="border-t border-pink-300">
                                            <td className="py-2 w-[10%] md:text-[15px] text-[13px]">{a.time}</td>
                                            <td className="py-2 w-[20%] md:text-[15px] text-[13px]">{a.customer}</td>
                                            <td className="py-2 w-[15%] md:text-[15px] text-[13px]">{a.service}</td>
                                            <td className="py-2 w-[20%] md:text-[15px] text-[13px]">{getBarberName(a.barberId)}</td>
                                            <td className="py-2 w-[15%] md:text-[15px] text-[13px]">{a.status}</td>
                                            <td className="py-2 text-left flex sm:flex-row flex-col sm:justify-end justify-center items-center">
                                                <button onClick={() => changeAppointmentTime(a.id, prompt('زمان جدید را وارد کنید (مثال: 14:30)', a.time) || a.time)} className="sm:ml-2 w-full sm:w-20 mb-1 px-2 py-1 cursor-pointer rounded bg-blue-400 text-white text-xs">تغییر زمان</button>
                                                <button onClick={() => cancelAppointment(a.id)} className="w-full sm:w-20 px-2 py-1 rounded bg-red-500 text-white text-xs cursor-pointer">لغو</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </Card>
                    </div>

                  
                </section>

                
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    
                      <Card  >
                        <div className="flex sm:flex-row flex-col justify-between items-center">
                            <div className="sm:w-[50%] w-full">
                                <div className="text-sm text-gray-500">خدمات</div>
                                <div className="mt-2 text-lg font-medium">
                                    <div>
                                        <table className="w-full text-sm">
                                            <thead>
                                                <tr className="text-right">
                                                    <th>نام خدمت</th>
                                                    <th>تایم</th>
                                                    <th>هزینه</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {services.map(s => (
                                                    <tr key={s.id} className="border-t border-pink-300">
                                                        <td className="py-2 pl-5">{s.name}</td>
                                                        <td className="py-2 pl-5">{s.duration}</td>
                                                        <td className="py-2 pl-5">{s.price}</td>
                                                        <td className="py-2 text-left flex items-center justify-enda">
                                                            <button
                                                                onClick={()=>openEditService(s)}
                                                                className="ml-2 px-2 py-1 cursor-pointer rounded bg-blue-400 text-white text-xs"
                                                            >تغییر </button>
                                                            <button
                                                                onClick={()=>deleteService(s.id)}
                                                                className="ml-2 px-2 py-1 cursor-pointer rounded bg-red-500 text-white text-xs"
                                                            >حذف </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <button onClick={openAddService} className="px-3 py-1 mt-2 bg-rose-500 text-white rounded text-sm">مدیریت خدمات</button>
                            </div>
                        </div>
                    </Card>


                    <aside>
                        <Card title="آرایشگرها" >
                            <div className="space-y-3">
                                {barbers.map(b => (
                                    <div key={b.id} className="p-2 border border-rose-300 rounded flex items-start justify-between">
                                        <div className="text-right">
                                            <div className="font-medium">{b.name}</div>
                                            <div className="text-xs text-gray-500">{b.phone} • {b.schedule}</div>
                                            <div className="text-xs mt-1">تخصص‌ها: {b.specialties.join('، ')}</div>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <button onClick={() => openEditBarber(b)} className="px-2 py-1 rounded cursor-pointer bg-blue-400 text-white text-xs">ویرایش</button>
                                            <button onClick={() => deleteBarber(b.id)} className="px-2 py-1 rounded cursor-pointer bg-red-500 text-white text-xs">حذف</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>


                    </aside>
                </section>
            </div>

            {/* Modals: Services */}
            {showServiceModal && (
                <Modal onClose={() => { setShowServiceModal(false); setEditingService(null) }} title={editingService?.id ? 'ویرایش خدمت' : 'ثبت خدمت جدید'}>
                    <ServiceForm initial={editingService} onCancel={() => { setShowServiceModal(false); setEditingService(null) }} onSave={saveService} />
                </Modal>
            )}

            {/* Modals: Barber */}
            {showBarberModal && (
                <Modal onClose={() => { setShowBarberModal(false); setEditingBarber(null) }} title={editingBarber?.id ? 'ویرایش آرایشگر' : 'ثبت آرایشگر جدید'}>
                    <BarberForm initial={editingBarber} onCancel={() => { setShowBarberModal(false); setEditingBarber(null) }} onSave={saveBarber} />
                </Modal>
            )}
        </div>
    )
}

// ------------------- Reusable small components -------------------
function Card({ children, title }: { children: ReactNode, title?: string }) {
    return (
        <div className={`bg-white p-4 rounded-lg shadow-sm `}>
            {title && <h3 className="mb-3 text-right font-medium">{title}</h3>}
            {children}
        </div>
    )
}

function Modal({ children, onClose, title }: ModalProps) {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black/40" onClick={onClose}></div>
            <div className="relative bg-white rounded-lg shadow-lg w-full max-w-lg p-4">
                <div className="flex justify-between items-center mb-3">
                    <h4 className="text-right font-semibold">{title}</h4>
                    <button onClick={onClose} className="cursor-pointer text-sm text-gray-600">بستن</button>
                </div>
                <div>{children}</div>
            </div>
        </div>
    )
}

function ServiceForm({ initial, onSave }: ServiceFormProps) {
    const [state, setState] = useState(initial || { id: null, name: '', duration: 30, price: 0 })
    return (
        <div className="space-y-3 text-right">
            <label className="block">
                <div className="text-xs text-gray-600 mb-1">نام خدمت</div>
                <input value={state.name} onChange={(e) => setState(prev => ({ ...prev, name: e.target.value }))} className="w-full p-2 border rounded text-right" />
            </label>
            <label className="block">
                <div className="text-xs text-gray-600 mb-1">مدت زمان (دقیقه)</div>
                <input type="number" value={state.duration} onChange={(e) => setState(prev => ({ ...prev, duration: Number(e.target.value) }))} className="w-full p-2 border rounded text-right" />
            </label>
            <label className="block">
                <div className="text-xs text-gray-600 mb-1">قیمت (تومان)</div>
                <input type="number" value={state.price} onChange={(e) => setState(prev => ({ ...prev, price: Number(e.target.value) }))} className="w-full p-2 border rounded text-right" />
            </label>
            <div className="flex justify-between">
                <button onClick={() => onSave(state)} className="px-3 py-1 rounded bg-rose-400 text-white cursor-pointer">ذخیره</button>
            </div>
        </div>
    )
}

function BarberForm({ initial, onSave }: BarberFormProps) {
    const [state, setState] = useState(initial || { id: null, name: '', phone: '', schedule: '', specialties: [] })
    const [specText, setSpecText] = useState('')

    function addSpecialty() {
        if (!specText) return
        setState(prev => ({ ...prev, specialties: [...prev.specialties, specText] }))
        setSpecText('')
    }

    function removeSpec(i: any) {
        setState(prev => ({ ...prev, specialties: prev.specialties.filter((_, idx) => idx !== i) }))
    }

    return (
        <div className="space-y-3 text-right">
            <label>
                <div className="text-xs text-gray-600 mb-1">نام</div>
                <input value={state.name} onChange={(e) => setState(prev => ({ ...prev, name: e.target.value }))} className="w-full p-2 border rounded text-right" />
            </label>
            <label>
                <div className="text-xs text-gray-600 mb-1">تلفن</div>
                <input value={state.phone} onChange={(e) => setState(prev => ({ ...prev, phone: e.target.value }))} className="w-full p-2 border rounded text-right" />
            </label>
            <label>
                <div className="text-xs text-gray-600 mb-1">ساعات حضور</div>
                <input value={state.schedule} onChange={(e) => setState(prev => ({ ...prev, schedule: e.target.value }))} className="w-full p-2 border rounded text-right" />
            </label>

            <div>
                <div className="text-xs text-gray-600 mb-1">تخصص‌ها</div>
                <div className="flex gap-2">
                    <input value={specText} onChange={(e) => setSpecText(e.target.value)} className="flex-1 p-2 border rounded text-right" placeholder="مثلا: رنگ" />
                    <button onClick={addSpecialty} className="px-3 py-1 rounded bg-pink-600 text-white cursor-pointer">اضافه</button>
                </div>
                <div className="mt-2 flex gap-2 flex-wrap">
                    {state.specialties.map((s, i) => (
                        <span key={i} className="px-2 py-1 bg-gray-100 rounded text-xs flex items-center gap-2">
                            {s}
                            <button onClick={() => removeSpec(i)} className="text-red-500 text-xs cursor-pointer">×</button>
                        </span>
                    ))}
                </div>
            </div>

            <div className="flex justify-between">
                <button onClick={() => onSave(state)} className="px-3 py-1 rounded bg-rose-400 text-white cursor-pointer">ذخیره</button>
            </div>
        </div>
    )
}
