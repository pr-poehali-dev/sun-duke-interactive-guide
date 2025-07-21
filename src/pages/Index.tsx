import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Icon from '@/components/ui/icon';

interface StepData {
  id: number;
  title: string;
  content: string;
  warning?: string;
  isCompleted: boolean;
}

const Index = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [credentials, setCredentials] = useState({ login: '', password: '' });
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  // Извлечение логина и пароля из URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const login = urlParams.get('login') || '';
    const password = urlParams.get('password') || '';
    setCredentials({ login, password });
  }, []);

  const steps: StepData[] = [
    {
      id: 1,
      title: "⚠️ Важные ограничения",
      content: "СТРОГО ЗАПРЕЩЕНО ВХОДИТЬ В ПРОФИЛЬ СО СМАРТФОНА ИЛИ ПК! При попытке входа со стороннего устройства в выдаче будет отказано, без возврата средств.",
      warning: "Используйте только консоль для входа в аккаунт",
      isCompleted: completedSteps.includes(1)
    },
    {
      id: 2,
      title: "🎮 Создание пользователя",
      content: "На консоли откройте ⚙️ Системные настройки → Пользователь → Добавить пользователя → Создать нового пользователя. Выберите любые аватарку и ник, нажмите ОК.",
      isCompleted: completedSteps.includes(2)
    },
    {
      id: 3,
      title: "🔑 Вход в аккаунт",
      content: `Нажмите "Войти и установить связь". Когда появится QR, выберите "Другой способ для входа". Введите логин: ${credentials.login || '[будет показан в URL]'} и пароль: ${credentials.password || '[будет показан в URL]'}`,
      isCompleted: completedSteps.includes(3)
    },
    {
      id: 4,
      title: "✅ Завершение настройки",
      content: "Уточните у продавца код подтверждения и быстро введите его. Нажмите Далее → Связать → ОК. В разделе Пользователи выберите новый профиль и установите Настройки онлайн-лицензии в положение ВКЛ.",
      isCompleted: completedSteps.includes(4)
    },
    {
      id: 5,
      title: "📥 Загрузка игр",
      content: "Вернитесь на 🏠 Домашнюю страницу. Откройте Виртуальные игровые карты → выберите добавленного пользователя → нажмите на игру → Параметры → Загрузить данные.",
      isCompleted: completedSteps.includes(5)
    },
    {
      id: 6,
      title: "✈️ Важная памятка",
      content: "Игры запускаются только с интернетом. СРАЗУ после запуска игры включайте режим полёта! Не меняйте данные профиля. Несоблюдение может привести к слёту аккаунта.",
      warning: "Обязательно включайте режим полёта после запуска игры",
      isCompleted: completedSteps.includes(6)
    }
  ];

  const toggleStepCompletion = (stepId: number) => {
    setCompletedSteps(prev => 
      prev.includes(stepId) 
        ? prev.filter(id => id !== stepId)
        : [...prev, stepId]
    );
  };

  const progress = (completedSteps.length / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-amber-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <img 
              src="https://cdn.poehali.dev/files/1f2f71c9-9139-41ea-b95a-6f66419d9cc0.png" 
              alt="Сундук" 
              className="w-12 h-12 object-contain"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Инструкция по активации</h1>
              <p className="text-gray-600">Магазин игровых аккаунтов "Сундук"</p>
            </div>
          </div>
          
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Прогресс выполнения</span>
              <span className="text-sm text-gray-500">{completedSteps.length} из {steps.length}</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Steps Navigation */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Шаги</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {steps.map((step) => (
                  <Button
                    key={step.id}
                    variant={currentStep === step.id ? "default" : "ghost"}
                    className={`w-full justify-start text-left h-auto p-3 ${
                      completedSteps.includes(step.id) 
                        ? 'bg-green-50 text-green-700 border-green-200' 
                        : currentStep === step.id 
                        ? 'bg-amber-500 text-white' 
                        : 'hover:bg-amber-50'
                    }`}
                    onClick={() => setCurrentStep(step.id)}
                  >
                    <div className="flex items-center gap-2">
                      {completedSteps.includes(step.id) ? (
                        <Icon name="CheckCircle" size={16} />
                      ) : (
                        <span className="w-6 h-6 rounded-full bg-amber-200 text-amber-800 text-xs flex items-center justify-center font-medium">
                          {step.id}
                        </span>
                      )}
                      <span className="text-sm font-medium truncate">
                        {step.title.replace(/[⚠️🎮🔑✅📥✈️]/g, '').trim()}
                      </span>
                    </div>
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Current Step Content */}
          <div className="lg:col-span-3">
            <Card className="animate-fade-in">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">
                    {steps.find(s => s.id === currentStep)?.title}
                  </CardTitle>
                  <Badge variant={completedSteps.includes(currentStep) ? "default" : "secondary"}>
                    {completedSteps.includes(currentStep) ? 'Выполнено' : 'В процессе'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {steps.find(s => s.id === currentStep)?.warning && (
                  <Alert className="border-red-200 bg-red-50">
                    <Icon name="AlertTriangle" size={16} className="text-red-600" />
                    <AlertDescription className="text-red-800">
                      {steps.find(s => s.id === currentStep)?.warning}
                    </AlertDescription>
                  </Alert>
                )}
                
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed text-base">
                    {steps.find(s => s.id === currentStep)?.content}
                  </p>
                </div>

                {/* Credentials Display */}
                {currentStep === 3 && (credentials.login || credentials.password) && (
                  <Card className="bg-amber-50 border-amber-200">
                    <CardContent className="pt-6">
                      <h4 className="font-medium mb-3 text-amber-800">Ваши данные для входа:</h4>
                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <span className="font-medium text-amber-700">Логин:</span>
                          <code className="bg-white px-2 py-1 rounded text-sm border">{credentials.login}</code>
                        </div>
                        <div className="flex gap-2">
                          <span className="font-medium text-amber-700">Пароль:</span>
                          <code className="bg-white px-2 py-1 rounded text-sm border">{credentials.password}</code>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Actions */}
                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={() => toggleStepCompletion(currentStep)}
                    variant={completedSteps.includes(currentStep) ? "outline" : "default"}
                    className={completedSteps.includes(currentStep) ? "border-green-300 text-green-700" : "bg-amber-500 hover:bg-amber-600"}
                  >
                    <Icon 
                      name={completedSteps.includes(currentStep) ? "RotateCcw" : "Check"} 
                      size={16} 
                      className="mr-2" 
                    />
                    {completedSteps.includes(currentStep) ? 'Отменить' : 'Выполнено'}
                  </Button>
                  
                  {currentStep < steps.length && (
                    <Button
                      variant="outline"
                      onClick={() => setCurrentStep(currentStep + 1)}
                    >
                      Следующий шаг
                      <Icon name="ChevronRight" size={16} className="ml-2" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;